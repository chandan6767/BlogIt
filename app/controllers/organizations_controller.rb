# frozen_string_literal: true

class OrganizationsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token

  def index
    @organizations = Organization.order(created_at: :desc)
  end
end
