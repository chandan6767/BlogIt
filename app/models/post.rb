class Post < ApplicationRecord
  MAX_TITLE_LENGTH = 125
  MAX_DESCRIPTION_LENGTH = 10000
  VALID_TITLE_REGEX = /\A.*[a-zA-Z0-9].*\z/i
  VALID_BLOGGABLE_VALUES = [true, false].freeze

  validates :title, 
    presence: true, 
    length: { maximum: MAX_TITLE_LENGTH },
    format: { with: VALID_TITLE_REGEX }
  validates :description, 
    presence: true,
    length: { maximum: MAX_DESCRIPTION_LENGTH }
  validates_inclusion_of :is_bloggable,
      in: VALID_BLOGGABLE_VALUES
end
