# 语言切换控制器 - Locale switching controller
# 处理用户的语言切换请求 - Handles user language switching requests
class LocalesController < ApplicationController
  # 切换语言动作 - Switch locale action
  def switch
    # 获取请求的语言 - Get requested locale
    locale = params[:locale]&.to_s

    # 验证语言是否支持 - Validate if locale is supported
    if I18n.available_locales.map(&:to_s).include?(locale)
      # 保存语言设置到会话 - Save locale to session
      session[:locale] = locale
      I18n.locale = locale.to_sym

      # 构建重定向URL，包含语言参数 - Build redirect URL with locale parameter
      redirect_url = request.referer || root_path

      # 如果URL中已经有语言参数，替换它；否则添加语言参数
      # If URL already has locale parameter, replace it; otherwise add locale parameter
      if redirect_url.include?('/en') || redirect_url.include?('/zh')
        redirect_url = redirect_url.gsub(/\/(en|zh)/, "/#{locale}")
      else
        redirect_url = "/#{locale}#{redirect_url.gsub(request.base_url, '')}"
      end

      redirect_to redirect_url
    else
      # 设置错误消息 - Set error message
      flash[:alert] = t('flash.error', default: 'Invalid language selection.')
      redirect_back(fallback_location: root_path)
    end
  end
end
