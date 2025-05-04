# frozen_string_literal: true

class Posts::PdfsController < ApplicationController
  def create
    PdfsJob.perform_async(current_user.id, post_slug, pdf_path.to_s)
    render_notice(t("in_progress", action: "PDF generation"))
  end

  def download
    if File.exist?(pdf_path)
      send_file(
        pdf_path,
        type: "application/pdf",
        filename: pdf_file_name,
        disposition: "attachment"
      )
    else
      render_error(t("not_found", entity: "pdf"), :not_found)
    end
  end

  private

    def post_slug
      params[:post_slug]
    end

    def pdf_path
      @_pdf_path ||= Rails.root.join("tmp/#{pdf_file_name}")
    end

    def pdf_file_name
      "post-#{post_slug}.pdf"
    end
end
