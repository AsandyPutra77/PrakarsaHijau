import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image, Tag, TagLabel, TagRightIcon, Flex, Button, Input, VStack, HStack, IconButton } from '@chakra-ui/react';
import { IoIosPricetags } from "react-icons/io";
import { ArrowBackIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import { db, auth } from '../../firebase/firebase';
import { doc, getDoc, collection, query, where, onSnapshot, addDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../helper/Loading';

export const DetailTips = () => {
  const { id } = useParams();
  const [ tip, setTip ] = useState(null);
  const [ comments, setComments ] = useState([]);
  const [ newComment, setNewComment ] = useState('');
  const [ user, setUser ] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTip = async () => {
      const docRef = doc(db, 'tips', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTip(docSnap.data());
      }
    }

    const fetchComments = () => {
      const commentsRef = collection(db, 'comments');
      const q = query(commentsRef, where("tipId", "==", id));
      
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const commentsData = [];
        querySnapshot.forEach((doc) => {
          let comment = doc.data();
          comment.id = doc.id;
          commentsData.push(comment);
        });
        
        for (let comment of commentsData) {
          if (comment.userId) {
            const userSnapshot = await getDoc(doc(db, 'users', comment.userId));
            if (userSnapshot.exists()) {
              comment.userName = userSnapshot.data().displayName;
              comment.userAvatar = userSnapshot.data().avatar;
            }
          } else {
            continue;
          }
        }
        
        setComments(commentsData);
      });

      return unsubscribe;
    }

    const unsubscribeAuth = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUser({
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          avatar: userAuth.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    fetchTip();
    const unsubscribeComments = fetchComments();

    return () => {
      unsubscribeAuth();
      unsubscribeComments();
    };
  }, [id]);

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  }

  const handleNewCommentSubmit = async () => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      if (!(await getDoc(userRef)).exists()) {
        await setDoc(userRef, { displayName: user.displayName, avatar: user.photoURL });
      }

      await addDoc(collection(db, 'comments'), { 
        text: newComment, 
        tipId: id, 
        upvotes: 0, 
        downvotes: 0,
        userId: user.uid,
        timestamp: new Date()
      });

      setNewComment('');
    }
  }

  const handleUpvote = async (commentId, currentUpvotes, upvotedUsers) => {
    const commentRef = doc(db, 'comments', commentId);
    upvotedUsers = upvotedUsers || [];
    if (upvotedUsers.includes(user.uid)) {
      await updateDoc(commentRef, { 
        upvotes: currentUpvotes - 1,
        upvotedUsers: upvotedUsers.filter(uid => uid !== user.uid)
      });
    } else {
      await updateDoc(commentRef, { 
        upvotes: currentUpvotes + 1,
        upvotedUsers: [...upvotedUsers, user.uid]
      });
    }
  }
  
  const handleDownvote = async (commentId, currentDownvotes, downvotedUsers) => {
    const commentRef = doc(db, 'comments', commentId);
    downvotedUsers = downvotedUsers || [];
    if (downvotedUsers.includes(user.uid)) {
      await updateDoc(commentRef, { 
        downvotes: currentDownvotes - 1,
        downvotedUsers: downvotedUsers.filter(uid => uid !== user.uid)
      });
    } else {
      await updateDoc(commentRef, { 
        downvotes: currentDownvotes + 1,
        downvotedUsers: [...downvotedUsers, user.uid]
      });
    }
  }

  if (!tip) {
    return <Loading />;
  }

  return (
      <Box 
          bg="#F5F5F5" 
          boxShadow="0px 4px 30px rgba(0, 0, 0, 0.05)" 
          borderRadius="lg"
          overflow="hidden"
          maxH="80%"
          maxWidth="100%" 
          mt={10}
          mx="auto"
          p={5} 
      >
          <Button 
              leftIcon={<ArrowBackIcon />} 
              color="#FFFFFF"
              bg="#08C84F" 
              variant="outline" 
              mt={4}
              ms={0}
              mb={4} 
              onClick={() => navigate('/tips')}
          >
              Back to Tips
          </Button>
          <Image 
              height="500px"
              width="100%"
              src={tip.imageUrl} 
              alt={tip.title} 
              objectFit="cover"
          />
          <Flex 
              direction="column" 
              p="5"
              width="100%"
          >
              <Heading 
                  fontFamily="'Inter'" 
                  fontWeight="600" 
                  fontSize="3xl"
                  mb="2"
                  color="#333333"
              >
                  {tip.title}
              </Heading>
            <Tag size='md' variant='solid' bg="#6ED840" color="#FFFFFF" maxWidth="fit-content" whiteSpace="nowrap" mb="4">
                <TagLabel>#{tip.tag}</TagLabel>
                <TagRightIcon as={IoIosPricetags} />
            </Tag>
            <Text 
                fontFamily="'Inter'"
                fontSize="md"
            >
                {tip.description}
            </Text>
            <Input 
                value={newComment} 
                onChange={handleNewCommentChange} 
                placeholder="Add a comment" 
                mb="4"
            />
            <Button onClick={handleNewCommentSubmit} mb={4}>Submit Comment</Button>
            <VStack align="stretch" spacing="4">
            {comments.map(comment => (
                  <Box key={comment.id} bg="white" p="4" borderRadius="md">
                      <HStack mb="2">
                          <Image objectFit='cover' boxSize="40px" borderRadius="full" src={comment.userAvatar} alt={comment.userName} />
                          <Text fontWeight="bold">{comment.userName}</Text>
                      </HStack>
                      <Text>{comment.text}</Text>
                      <Text mb='4' fontSize="sm" color="gray.500">
                        {new Date(comment.timestamp?.toDate()).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </Text>
                      <HStack justify="space-between">
                      <HStack>
                        <IconButton 
                          aria-label="Upvote" 
                          icon={<ArrowUpIcon />} 
                          colorScheme={(comment.upvotedUsers || []).includes(user.uid) ? 'green' : 'gray'}
                          onClick={() => handleUpvote(comment.id, comment.upvotes, comment.upvotedUsers)} 
                        />
                        <Text>{comment.upvotes}</Text>
                        <IconButton 
                          aria-label="Downvote" 
                          icon={<ArrowDownIcon />} 
                          colorScheme={(comment.downvotedUsers || []).includes(user.uid) ? 'red' : 'gray'}
                          onClick={() => handleDownvote(comment.id, comment.downvotes, comment.downvotedUsers)} 
                        />
                        <Text>{comment.downvotes}</Text>
                      </HStack>
                      </HStack>
                  </Box>
              ))}
            </VStack>
        </Flex>
    </Box>
  );
}