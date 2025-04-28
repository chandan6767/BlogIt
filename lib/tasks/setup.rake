# frozen_string_literal: true

desc "Drops the DB, creates DB, migrates DB, and populates with sample data"
task setup: [:environment, 'db:drop', 'db:create', 'db:migrate'] do
  Rake::Task['populate_with_sample_data'].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_sample_data!
    puts "Sample data has been added."
  end
end


def create_sample_data!
  puts "Seeding with sample data..."

  organization1 = create_organization!(name: "Sample Organization 1")
  organization2 = create_organization!(name: "Sample Organization 2")

  create_user!(
    email: "oliver@example.com",
    name: "Oliver",
    password: "welcome",
    organization_id: organization1.id
  )

  create_user!(
    email: "sam@example.com",
    name: "Sam",
    password: "welcome",
    organization_id: organization2.id
  )

  puts 'Done! Now you can login with either "oliver@example.com" or "sam@example.com", using password "welcome"'
end

def create_organization!(options = {})
  Organization.find_or_create_by!(name: options[:name]).tap do |organization|
    puts "Organization created with ID: #{organization.id} and Name: #{organization.name}"
  end
end

def create_user!(options = {})
  user_attributes = {
    password_confirmation: options[:password],
  }
  attributes = user_attributes.merge(options)

  User.find_or_create_by!(email: attributes[:email]) do |user|
    user.name = attributes[:name]
    user.password = attributes[:password]
    user.password_confirmation = attributes[:password_confirmation]
    user.organization_id = attributes[:organization_id]
  end.tap do |user|
    puts "User created:"
    puts "- Name: #{user.name}"
    puts "- Email: #{user.email}"
    puts "- Organization ID: #{user.organization_id}"
    puts "- Authentication Token: #{user.authentication_token}"
  end
end
