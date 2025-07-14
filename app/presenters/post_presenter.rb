class PostPresenter < ApplicationPresenter
  def formatted_published_date
    return "Draft" unless published?
    
    published_at.strftime("%B %d, %Y")
  end

  def reading_time_text
    time = reading_time
    return "Less than 1 min read" if time < 1
    
    "#{time} min read"
  end

  def status_badge_class
    published? ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
  end

  def status_text
    published? ? "Published" : "Draft"
  end

  def excerpt_or_truncated_content
    return object.excerpt if object.excerpt.present?

    if object.content.present?
      plain_text = object.content.to_plain_text
      plain_text.length > 300 ? plain_text[0..300] + "..." : plain_text
    else
      "No content available"
    end
  end

  def formatted_tags
    tags.map(&:name).join(", ")
  end

  def tag_links
    tags.map do |tag|
      link_to tag.name, tag_path(tag.slug), 
              class: "inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2"
    end.join.html_safe
  end

  def author_name
    user.display_name
  end

  def comments_count_text
    count = comments_count
    case count
    when 0
      "No comments"
    when 1
      "1 comment"
    else
      "#{count} comments"
    end
  end

  def views_count_text
    count = views_count
    case count
    when 0
      "No views"
    when 1
      "1 view"
    else
      "#{count} views"
    end
  end

  def meta_description
    excerpt_or_truncated_content
  end

  def social_share_url
    post_url(object)
  end

  def edit_link
    return unless view_context&.current_user == user
    
    link_to "Edit", edit_post_path(object), 
            class: "text-blue-600 hover:text-blue-800"
  end
end
