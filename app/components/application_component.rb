class ApplicationComponent < ViewComponent::Base
  # Base component class for all ViewComponents
  
  private

  def current_user
    helpers.current_user if helpers.respond_to?(:current_user)
  end

  def user_signed_in?
    helpers.user_signed_in? if helpers.respond_to?(:user_signed_in?)
  end
end
