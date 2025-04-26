# frozen_string_literal: true

class OrganizationsController < ApplicationController
  def index
    @organizations = Organization.order(created_at: :desc)
  end
end
