class ApplicationPresenter
  include ActionView::Helpers::TextHelper
  include ActionView::Helpers::UrlHelper
  include ActionView::Helpers::DateHelper
  include Rails.application.routes.url_helpers

  def initialize(object, view_context = nil)
    @object = object
    @view_context = view_context
  end

  private

  attr_reader :object, :view_context

  def method_missing(method_name, *args, &block)
    if object.respond_to?(method_name)
      object.send(method_name, *args, &block)
    else
      super
    end
  end

  def respond_to_missing?(method_name, include_private = false)
    object.respond_to?(method_name) || super
  end
end
