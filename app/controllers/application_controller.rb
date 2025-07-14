class ApplicationController < ActionController::Base
  include Pundit::Authorization

  # 防止 CSRF 攻击 - Prevent CSRF attacks by raising an exception.
  protect_from_forgery with: :exception

  # 国际化支持 - Internationalization support
  before_action :set_locale
  around_action :switch_locale

  # Devise 配置 - Devise configuration
  # before_action :authenticate_user!, except: [:index, :show]
  before_action :configure_permitted_parameters, if: :devise_controller?

  # Pundit 配置 - Pundit configuration
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  # 设置当前语言 - Set current locale
  def set_locale
    # 从参数、会话或默认值中获取语言设置
    # Get locale from params, session, or default
    I18n.locale = extract_locale || I18n.default_locale
  end

  # 切换语言环境 - Switch locale context
  def switch_locale(&action)
    locale = extract_locale || I18n.default_locale
    I18n.with_locale(locale, &action)
  end

  # 提取语言设置 - Extract locale from various sources
  def extract_locale
    # 优先级：URL参数 > 会话 > 浏览器语言 > 默认语言
    # Priority: URL params > session > browser language > default
    parsed_locale = params[:locale]&.to_s || session[:locale]&.to_s || extract_locale_from_accept_language_header

    # 验证语言是否支持 - Validate if locale is supported
    I18n.available_locales.map(&:to_s).include?(parsed_locale) ? parsed_locale.to_sym : nil
  end

  # 从浏览器语言头中提取语言 - Extract locale from browser Accept-Language header
  def extract_locale_from_accept_language_header
    return nil unless request.env['HTTP_ACCEPT_LANGUAGE']

    # 解析浏览器语言偏好 - Parse browser language preferences
    request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
  end

  # 默认 URL 选项包含语言参数 - Default URL options include locale
  def default_url_options
    { locale: I18n.locale }
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :bio, :website])
    devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name, :bio, :website])
  end

  def user_not_authorized
    flash[:alert] = t('flash.error', default: "You are not authorized to perform this action.")
    redirect_to(request.referrer || root_path)
  end
end
