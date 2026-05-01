import { useState } from "react";
import { useAuth, SignInButton } from "@clerk/react";
import { useCreateComment, useDeleteComment } from "../hooks/useComments";
import {
  SendIcon,
  Trash2Icon,
  MessageSquareIcon,
  LogInIcon,
} from "lucide-react";

function CommentsSection({ productId, comments = [], currentUserId }) {
  const { isSignedIn } = useAuth();
  const [content, setContent] = useState("");
  const createComment = useCreateComment();
  const deleteComment = useDeleteComment(productId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    createComment.mutate(
      { productId, content },
      { onSuccess: () => setContent("") }
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquareIcon className="size-5 text-orange-500" />
        <h3 className="font-bold text-stone-900">Comments</h3>
        <span className="bg-stone-100 text-stone-500 text-xs font-semibold px-2 py-0.5 rounded-full">
          {comments.length}
        </span>
      </div>

      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all bg-white"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={createComment.isPending}
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-xl transition-colors disabled:opacity-50"
            disabled={createComment.isPending || !content.trim()}
          >
            {createComment.isPending ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <SendIcon className="size-4" />
            )}
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-between bg-amber-50 border border-orange-100 rounded-xl p-3">
          <span className="text-sm text-stone-500">
            Sign in to join the conversation
          </span>
          <SignInButton mode="modal">
            <button className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full transition-colors">
              <LogInIcon className="size-4" />
              Sign In
            </button>
          </SignInButton>
        </div>
      )}

      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {comments.length === 0 ? (
          <div className="text-center py-8 space-y-2">
            <MessageSquareIcon className="size-8 mx-auto text-stone-200" />
            <p className="text-sm text-stone-400">No comments yet. Be first!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3">
              <img
                src={comment.user?.imageUrl}
                alt={comment.user?.name}
                className="w-8 h-8 rounded-full shrink-0 mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-stone-700">
                    {comment.user?.name}
                  </span>
                  <span className="text-xs text-stone-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="bg-stone-50 rounded-xl rounded-tl-sm px-3 py-2 text-sm text-stone-700">
                  {comment.content}
                </div>
              </div>
              {currentUserId === comment.userId && (
                <button
                  onClick={() =>
                    confirm("Delete?") &&
                    deleteComment.mutate({ commentId: comment.id })
                  }
                  className="text-stone-300 hover:text-red-400 transition-colors mt-1 shrink-0"
                  disabled={deleteComment.isPending}
                >
                  <Trash2Icon className="size-3.5" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentsSection;
