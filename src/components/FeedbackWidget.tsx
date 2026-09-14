import { useState } from "react";
import { ThumbsUp, ThumbsDown, CheckCircle2, Send } from "lucide-react";

interface FeedbackWidgetProps {
  articleTitle: string;
  articleSlug: string;
}

export function FeedbackWidget({ articleTitle, articleSlug }: FeedbackWidgetProps) {
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);
  const [comment, setComment] = useState("");
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const handleVote = (vote: "yes" | "no") => {
    setFeedback(vote);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setCommentSubmitted(true);
  };

  return (
    <section aria-labelledby="feedback-heading" className="my-8 border-t border-b border-slate-200 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 id="feedback-heading" className="text-sm font-semibold text-slate-900">
            Was this article helpful?
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Your feedback helps us refine our credentialing and compliance guides.
          </p>
        </div>

        {feedback === null ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleVote("yes")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
            >
              <ThumbsUp className="size-3.5 text-slate-500" />
              <span>Yes</span>
            </button>

            <button
              onClick={() => handleVote("no")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
            >
              <ThumbsDown className="size-3.5 text-slate-500" />
              <span>No</span>
            </button>
          </div>
        ) : feedback === "yes" ? (
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="size-4 text-emerald-600" />
            <span>Thank you for your feedback!</span>
          </div>
        ) : (
          <div className="space-y-3 w-full sm:max-w-md">
            {commentSubmitted ? (
              <div className="flex items-center gap-2 text-xs font-medium text-[#2196F3] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                <CheckCircle2 className="size-4 text-[#2196F3]" />
                <span>Thank you! Your feedback helps us improve our guides.</span>
              </div>
            ) : (
              <form onSubmit={handleCommentSubmit} className="space-y-2">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="How can we improve this article? (e.g. missing payer policy, unclear CAQH step...)"
                  rows={2}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#2196F3] resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#2196F3] text-white text-xs font-bold hover:bg-[#1976D2] transition-colors cursor-pointer shadow-2xs"
                  >
                    <Send className="size-3" />
                    <span>Send feedback</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeedbackWidget;
