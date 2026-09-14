import { useState } from "react";
import { ThumbsUp, ThumbsDown, CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";

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
    if (vote === "yes") {
      toast.success("Thank you for your feedback!");
    } else {
      toast.info("Thank you for letting us know.");
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setCommentSubmitted(true);
    toast.success("Feedback submitted to the credentialing team!");
  };

  return (
    <section aria-labelledby="feedback-heading" className="my-8 border-t border-b border-slate-200 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 id="feedback-heading" className="text-sm font-semibold text-slate-800">
          Was this article helpful?
        </h3>

        {feedback === null ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleVote("yes")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <ThumbsUp className="size-3.5 text-slate-500" />
              <span>Yes</span>
            </button>

            <button
              onClick={() => handleVote("no")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <ThumbsDown className="size-3.5 text-slate-500" />
              <span>No</span>
            </button>
          </div>
        ) : feedback === "yes" ? (
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
            <CheckCircle2 className="size-4" />
            <span>Thank you for your feedback!</span>
          </div>
        ) : (
          <div className="space-y-3 w-full sm:max-w-md">
            {commentSubmitted ? (
              <div className="flex items-center gap-2 text-xs font-medium text-[#043570]">
                <CheckCircle2 className="size-4" />
                <span>Thank you! Your feedback helps us improve our credentialing guides.</span>
              </div>
            ) : (
              <form onSubmit={handleCommentSubmit} className="space-y-2">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="How can we improve this credentialing guide?"
                  rows={2}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-hidden focus:border-[#043570] resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#043570] text-white text-xs font-bold hover:bg-[#032a57] transition-colors cursor-pointer"
                  >
                    <Send className="size-3" />
                    <span>Submit</span>
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
