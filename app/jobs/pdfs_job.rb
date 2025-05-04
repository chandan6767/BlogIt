# frozen_string_literal: true

class PdfsJob
  include Sidekiq::Job

  def perform(user_id, post_slug, report_path)
    post = Post.find_by!(slug: post_slug)

    p post

    content = ApplicationController.render(
      assigns: { post: },
      template: "posts/pdf/download",
      layout: "pdf"
    )

    pdf_blob = WickedPdf.new.pdf_from_string(content)

    File.open(report_path, "wb") do |file|
      file.write(pdf_blob)
    end
  end
end
