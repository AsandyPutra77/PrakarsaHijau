import React from "react";
import { HStack, IconButton } from "@chakra-ui/react";
import { FaThumbsUp, FaCommentDots } from "react-icons/fa";

export const SortingIconHelper = ({ onSortChange }) => {
  return (
    <HStack spacing={4}>
      <IconButton
        icon={<FaThumbsUp />}
        onClick={() => onSortChange("likes")}
        aria-label="Sort by likes"
      />
      <IconButton
        icon={<FaCommentDots />}
        onClick={() => onSortChange("comments")}
        aria-label="Sort by comments"
      />
    </HStack>
  );
};
