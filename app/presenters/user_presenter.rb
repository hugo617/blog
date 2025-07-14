class UserPresenter < ApplicationPresenter
  def display_name
    full_name.present? ? full_name : email
  end

  def initials
    if first_name.present? && last_name.present?
      "#{first_name[0]}#{last_name[0]}".upcase
    elsif first_name.present?
      first_name[0].upcase
    else
      email[0].upcase
    end
  end

  def bio_or_default
    bio.present? ? bio : "No bio available"
  end

  def website_link
    return unless website.present?
    
    url = website.start_with?('http') ? website : "https://#{website}"
    link_to website, url, target: "_blank", rel: "noopener noreferrer",
            class: "text-blue-600 hover:text-blue-800"
  end

  def posts_count_text
    count = posts.published.count
    case count
    when 0
      "No published posts"
    when 1
      "1 published post"
    else
      "#{count} published posts"
    end
  end

  def member_since
    "Member since #{created_at.strftime('%B %Y')}"
  end

  def avatar_placeholder_class
    "w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-medium"
  end

  def profile_link
    # If you have user profiles, link to user show page
    # For now, just return the display name
    display_name
  end
end
