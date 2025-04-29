# frozen_string_literal: true

class PostPolicy
  attr_reader :user, :post

  def initialize(user, post)
    @user = user
    @post = post
  end

  def create?
    true
  end

  def show?
    post.organization_id == user.organization_id
  end

  def update?
    post.user_id == user.id
  end

  def destroy?
    update?
  end
end
