class Tags::SuggestionService < ApplicationService
  COMMON_TECH_KEYWORDS = %w[
    ruby rails javascript react vue angular node
    python django flask fastapi
    java spring kotlin
    php laravel symfony
    go rust swift
    database sql postgresql mysql mongodb redis
    docker kubernetes aws azure gcp
    git github gitlab
    testing rspec jest cypress
    api rest graphql
    frontend backend fullstack
    mobile ios android
    machine learning ai data science
    devops ci cd deployment
    security authentication authorization
    performance optimization
    tutorial guide howto tips
  ].freeze

  def initialize(content)
    @content = content
  end

  def call
    return failure("Content is required") if content.blank?

    suggested_tags = extract_tags_from_content
    existing_tags = find_existing_tags(suggested_tags)
    new_tag_suggestions = suggest_new_tags(suggested_tags, existing_tags)

    success({
      existing_tags: existing_tags,
      new_suggestions: new_tag_suggestions,
      all_suggestions: (existing_tags + new_tag_suggestions).uniq
    })
  end

  private

  attr_reader :content

  def extract_tags_from_content
    # Convert content to plain text if it's rich text
    text = content.respond_to?(:to_plain_text) ? content.to_plain_text : content.to_s
    
    # Extract potential tags from content
    words = text.downcase.split(/\W+/).reject(&:blank?)
    
    # Find tech keywords
    tech_keywords = words & COMMON_TECH_KEYWORDS
    
    # Find repeated significant words (potential topics)
    word_frequency = words.each_with_object(Hash.new(0)) { |word, hash| hash[word] += 1 }
    frequent_words = word_frequency.select { |word, count| 
      count >= 2 && word.length >= 4 && !common_word?(word)
    }.keys

    (tech_keywords + frequent_words).uniq.first(10)
  end

  def find_existing_tags(suggested_words)
    return [] if suggested_words.empty?

    Tag.where("name ILIKE ANY (ARRAY[?])", suggested_words.map { |word| "%#{word}%" })
       .limit(5)
       .to_a
  end

  def suggest_new_tags(suggested_words, existing_tags)
    existing_names = existing_tags.map(&:name).map(&:downcase)
    
    suggested_words.reject { |word| 
      existing_names.any? { |name| name.include?(word) || word.include?(name) }
    }.first(3)
  end

  def common_word?(word)
    # List of common words to exclude from tag suggestions
    common_words = %w[
      the and for are but not you all can had her was one our out day get
      has his how man new now old see two way who boy did its let put say
      she too use that with have this will your from they know want been
      good much some time very when come here just like long make many over
      such take than them well were what where which work would could should
      about after again against because before being between both during each
      few more most other since through until while would
    ]
    
    common_words.include?(word)
  end
end
