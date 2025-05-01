# frozen_string_literal: true

require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  def setup
    @organization = build(:organization)
  end

  def test_organization_should_be_valid_with_valid_name
    assert @organization.valid?
  end

  def test_organization_should_not_be_valid_without_name
    @organization.name = ""
    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages, "Name can't be blank"
  end
end
