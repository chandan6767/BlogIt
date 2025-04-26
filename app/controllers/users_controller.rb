# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    user = User.create!(user_params)
    render_notice(t("successfully_created", name: user.name))
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :organization_id)
    end
end
