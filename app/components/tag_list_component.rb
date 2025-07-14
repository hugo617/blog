class TagListComponent < ApplicationComponent
  def initialize(tags:, variant: :default, limit: nil)
    @tags = tags
    @variant = variant
    @limit = limit
  end

  private

  attr_reader :tags, :variant, :limit

  def displayed_tags
    return tags unless limit
    
    tags.limit(limit)
  end

  def tag_class
    case variant
    when :small
      "inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-1 mb-1"
    when :large
      "inline-block bg-blue-100 text-blue-800 text-sm px-3 py-2 rounded-lg mr-2 mb-2"
    else
      "inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2"
    end
  end

  def show_more_link?
    limit && tags.count > limit
  end

  def remaining_count
    return 0 unless show_more_link?
    
    tags.count - limit
  end
end
