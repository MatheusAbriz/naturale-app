import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  LayoutAnimation,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { CommentDTO } from "@/types/comments";
import { addReply } from "@/services/CommentService";
import { useQueryClient } from "@tanstack/react-query";

const MAX_NEST_LEVEL = 2;

const FALLBACK_AVATAR =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80";

const C = {
  accent: "#6C9EFF",
  textPrimary: "#000",
  textSecondary: "#6B7080",
  threadLine: "#2A2E3F",
  danger: "#FF6B80",
} as const;

function ThreadLine() {
  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: 10,
        top: 38,
        bottom: 0,
        width: 1.5,
        backgroundColor: C.threadLine,
        borderRadius: 1,
      }}
    />
  );
}

type ReplyInputProps = {
  replyingToUsername: string;
  onSubmit: (text: string) => Promise<void>;
  onCancel: () => void;
};

function ReplyInput({
  replyingToUsername,
  onSubmit,
  onCancel,
}: ReplyInputProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<TextInput>(null);

  React.useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 150);
  }, []);

  const handleSubmit = async () => {
    const trimmed = text.trim();

    if (!trimmed || loading) return;

    setLoading(true);

    try {
      await onSubmit(trimmed);
      setText("");
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = text.trim().length > 0 && !loading;

  return (
    <View style={{ marginTop: 8, marginLeft: 42 }}>
      <TextInput
        ref={inputRef}
        value={text}
        onChangeText={setText}
        placeholder={`Respondendo a @${replyingToUsername}...`}
        placeholderTextColor={C.textSecondary}
        multiline
        maxLength={500}
        style={{
          fontSize: 14,
          color: C.textPrimary,
          minHeight: 38,
          maxHeight: 110,
          borderBottomWidth: 1,
          borderBottomColor: C.threadLine,
          lineHeight: 21,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 6,
          gap: 12,
        }}
      >
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!canSubmit}
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color={C.accent} />
          ) : (
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                color: canSubmit ? C.accent : C.textSecondary,
              }}
            >
              Enviar
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onCancel} activeOpacity={0.7}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: C.textSecondary,
            }}
          >
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export type CommentItemProps = {
  comment: CommentDTO;
  postId: number;
  currentUserId: number;
  level?: number;
};

export function CommentItem({
  comment,
  postId,
  currentUserId,
  level = 0,
}: CommentItemProps) {
  const [showReplyInput, setShowReplyInput] = useState(false);

  const queryClient = useQueryClient();

  const visualLevel = Math.min(level, MAX_NEST_LEVEL);

  const replies = comment.replies ?? [];

  const hasReplies = replies.length > 0;

  const handleToggleReplyInput = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowReplyInput((v) => !v);
  };

  const handleReplySubmit = async (text: string) => {
    await addReply({
      post_id: postId,
      user_id: currentUserId,
      comment_text: text,
      parent_comment_id: comment.id,
    });

    await queryClient.invalidateQueries({
      queryKey: ["comments"],
    });

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setShowReplyInput(false);

    Keyboard.dismiss();
  };

  return (
    <View
      style={{
        marginLeft: visualLevel * 14,
        marginTop: level === 0 ? 16 : 10,
      }}
    >
      {hasReplies && <ThreadLine />}

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <Image
          source={{ uri: comment.avatar ?? FALLBACK_AVATAR }}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            marginRight: 10,
          }}
        />

        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 5,
              marginBottom: 4,
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 13.5,
                color: C.textPrimary,
              }}
            >
              {comment.name}
            </Text>

            <Text
              style={{
                fontSize: 12,
                color: C.textSecondary,
              }}
            >
              @{comment.username}
            </Text>

            {comment.created_at && (
              <Text
                style={{
                  fontSize: 11,
                  color: C.textSecondary,
                }}
              >
                · {formatRelativeTime(comment.created_at)}
              </Text>
            )}
          </View>

          <Text
            style={{
              fontSize: 14,
              color: C.textPrimary,
              lineHeight: 21,
            }}
          >
            {comment.text}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 8,
              gap: 16,
            }}
          >
            <TouchableOpacity
              onPress={handleToggleReplyInput}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: showReplyInput
                    ? C.accent
                    : C.textSecondary,
                }}
              >
                Responder
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {showReplyInput && (
        <ReplyInput
          replyingToUsername={comment.username}
          onSubmit={handleReplySubmit}
          onCancel={() => setShowReplyInput(false)}
        />
      )}

      {replies.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          postId={postId}
          currentUserId={currentUserId}
          level={level + 1}
        />
      ))}
    </View>
  );
}

function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();

  const s = Math.floor(diff / 1000);

  if (s < 60) return `${s}s`;

  const m = Math.floor(s / 60);

  if (m < 60) return `${m}m`;

  const h = Math.floor(m / 60);

  if (h < 24) return `${h}h`;

  return `${Math.floor(h / 24)}d`;
}