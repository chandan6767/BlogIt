# frozen_string_literal: true

class PdfsJob
  include Sidekiq::Job

  def perform(user_id, post_slug)
    ActionCable.server.broadcast(user_id, { message: I18n.t("pdf.render"), progress: 25 })

    post = Post.find_by!(slug: post_slug)

    pdf_content = ApplicationController.render(
      assigns: { post: },
      template: "posts/pdf/download",
      layout: "pdf"
    )

    ActionCable.server.broadcast(user_id, { message: I18n.t("pdf.generate"), progress: 50 })

    pdf_report = WickedPdf.new.pdf_from_string(pdf_content)

    ActionCable.server.broadcast(user_id, { message: I18n.t("pdf.upload"), progress: 75 })

    if post.pdf.attached?
      post.pdf.purge_later
    end

    post.pdf.attach(
      io: StringIO.new(pdf_report), filename: "blog-it-#{post_slug}.pdf",
      content_type: "application/pdf"
    )

    post.save!

    ActionCable.server.broadcast(user_id, { message: I18n.t("pdf.attach"), progress: 100 })
  end
end
