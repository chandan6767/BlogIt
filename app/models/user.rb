# frozen_string_literal: true

class User < ApplicationRecord
  MAX_NAME_LENGTH = 35
  MIN_PASSWORD_LENGTH = 6
  VALID_NAME_REGEX = /\A.*[a-zA-Z0-9].*\z/i
  MAX_EMAIL_LENGTH = 255

  belongs_to :organization
  has_many :posts

  validates :name,
    presence: true,
    length: { maximum: MAX_NAME_LENGTH },
    format: { with: VALID_NAME_REGEX }
  validates :email,
    presence: true,
    uniqueness: { case_sensitive: false },
    length: { maximum: MAX_EMAIL_LENGTH },
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: MIN_PASSWORD_LENGTH }, if: -> { password.present? }
  validates :password_confirmation, presence: true, on: :create

  before_save :normalize_email

  has_secure_password
  has_secure_token :authentication_token

  private

    def normalize_email
      email.downcase!
      email.strip!
    end
end
