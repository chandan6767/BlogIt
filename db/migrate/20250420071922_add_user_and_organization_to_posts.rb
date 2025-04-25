# frozen_string_literal: true

class AddUserAndOrganizationToPosts < ActiveRecord::Migration[7.1]
  def up
    # Add the user reference
    add_reference :posts, :user, foreign_key: true

    # Add the organization reference
    add_reference :posts, :organization, foreign_key: true

    # Backfill existing posts with a default user and organization
    default_user = User.first || User.create!(
      name: "Default User", email: "default@example.com", password: "password",
      password_confirmation: "password", organization: Organization.first)
    default_organization = Organization.first || Organization.create!(name: "Default Organization")

    Post.update_all(user_id: default_user.id, organization_id: default_organization.id)

    # Add NOT NULL constraints after backfilling
    change_column_null :posts, :user_id, false
    change_column_null :posts, :organization_id, false
  end

  def down
    # Remove the references
    remove_reference :posts, :user, foreign_key: true
    remove_reference :posts, :organization, foreign_key: true
  end
end
