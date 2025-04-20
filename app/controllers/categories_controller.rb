# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :update, :destroy]

  def index
    categories = Category.all
    render_json({ categories: })
  end

  def create
    category = Category.create!(category_params)
    render_notice(t("successfully_created", name: category.name))
  end

  def show
    @category = Category.includes(posts: :user).find(params[:id])
  end

  def update
    if @category.update(category_params)
      render_notice(t("successfully_updated", name: @category.name))
    end
  end

  def destroy
    category_name = @category.name
    @category.destroy
    render_notice(t("successfully_deleted", name: category_name))
  end

  private

    def set_category
      @category = Category.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:name)
    end
end
