# frozen_string_literal: true

class Posts::PdfsController < ApplicationController
  before_action :load_post!, only: %i[create download]
  before_action :authorize_post, only: %i[create download]
  after_action :verify_authorized, only: %i[create download]

  def create
    PdfsJob.perform_async(current_user.id, @post.slug)
  end

  def download
    unless @post.pdf.attached?
      render_error(t("not_found", entity: "PDF"), :not_found) and return
    end

    send_data @post.pdf.download, filename: pdf_file_name, content_type: "application/pdf"
  end

  private

    def load_post!
      @post = Post.includes(:categories, :user).find_by!(
        slug: params[:post_slug],
        organization_id: @current_user.organization_id)
    end

    def authorize_post
      authorize @post
    end

    def pdf_path
      @_pdf_path ||= Rails.root.join("tmp/#{pdf_file_name}")
    end

    def pdf_file_name
      "blog-it-#{@post.slug}.pdf"
    end
end
