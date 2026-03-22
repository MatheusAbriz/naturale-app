import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type CommentItemProps = {
  comment: any;
  level?: number;
};

export function CommentItem({ comment, level = 0 }: CommentItemProps) {
  return (
    <View style={{ marginLeft: level * 12, marginTop: 12 }}>
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <Image
          source={{ uri: comment.avatar }}
          style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              marginRight: 8
        }}
        />

        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold", color: "#333" }}>
            {comment.name}{" "}
            <Text className="text-gray-300 text-sm">@{comment.username}</Text>
          </Text>

          <Text style={{ color: "#444", marginTop: 2 }}>
            {comment.text}
          </Text>

          <TouchableOpacity>
            <Text style={{ color: "#6C9EFF", marginTop: 4, fontSize: 12 }}>
              Responder
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {comment.replies?.map((reply: any) => (
        <CommentItem key={reply.id} comment={reply} level={level + 1} />
      ))}
    </View>
  );
}