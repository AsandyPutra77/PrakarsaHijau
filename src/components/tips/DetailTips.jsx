import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image, Tag, TagLabel, TagRightIcon, Flex, Button, Input, VStack, HStack, IconButton } from '@chakra-ui/react';
import { IoIosPricetags } from "react-icons/io";
import { ArrowBackIcon, ArrowUpIcon, ArrowDownIcon, DeleteIcon } from '@chakra-ui/icons';
import { db, auth } from '../../firebase/firebase';
import { doc, getDoc, collection, query, where, onSnapshot, addDoc, updateDoc, setDoc, deleteDoc, getDocs} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../helper/Loading';
import { DeleteAlertDialog } from '../action/DeleteAlertDialog';

export const DetailTips = () => {
  const { id } = useParams();
  const [ tip, setTip ] = useState(null);
  const [ comments, setComments ] = useState([]);
  const [ newComment, setNewComment ] = useState('');
  const [ user, setUser ] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
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

      const tipDoc = await getDoc(doc(db, 'tips', id));

      const totalComments = tipDoc.data().totalComments || 0;

      await addDoc(collection(db, 'comments'), { 
        text: newComment, 
        tipId: id, 
        upvotes: 0, 
        downvotes: 0,
        userId: user.uid,
        timestamp: new Date()
      });

      setNewComment('');
      
      await updateDoc(doc(db, 'tips', id), {
        totalComments: totalComments + 1
      });
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

const handleDeleteTips = async () => {
    if (user.uid === tip.uid) {
      setIsOpen(true);
    }
  };

  const handleDeleteComment = async (commentId) => {
    setDeleteCommentId(commentId);
    setIsOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteCommentId) {
      await deleteDoc(doc(db, 'comments', deleteCommentId));
      setDeleteCommentId(null);
    } else {
      await deleteRelatedComments();
  
      const userDoc = doc(db, 'users', tip.uid);
      const userSnap = await getDoc(userDoc);
  
      if (userSnap.exists()) {
        const totalTips = userSnap.data().totalTips || 0;
  
        const newTotalTips = totalTips > 0 ? totalTips - 1 : 0;
  
        await updateDoc(userDoc, {
          totalTips: newTotalTips
        });
      }
  
      await deleteDoc(doc(db, 'tips', id));
      navigate('/tips');
    }
    onClose();
  };

  const deleteRelatedComments = async () => {
    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, where("tipId", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  };
  

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
            <Flex justify="space-between" align="center">
              <Heading 
                fontFamily="'Inter'" 
                fontWeight="600" 
                fontSize="3xl"
                mb="2"
                color="#333333"
              >
                {tip.title}
              </Heading>
              {user.uid === tip.uid && (
                <Button 
                  leftIcon={<DeleteIcon />} 
                  colorScheme="red" 
                  onClick={handleDeleteTips}
                >
                  Delete Tip
                </Button>
              )}
                <DeleteAlertDialog 
                isOpen={isOpen}
                onClose={onClose}
                leastDestructiveRef={cancelRef}
                onConfirm={confirmDelete}
                  />
              </Flex>
              <HStack spacing={4}>
                    {Array.isArray(tip.tag) && tip.tag.map((tag, index) => (
                        <Tag size='md' key={index} variant='solid' colorScheme='blue'>
                            <TagLabel>{tag.trim()}</TagLabel>
                            <TagRightIcon as={IoIosPricetags} />
                        </Tag>
                    ))}
                </HStack>
            <Text 
                fontFamily="'Inter'"
                fontSize="md"
                mt={4}
              >
                {tip.description}
            </Text>
            <Input 
                value={newComment} 
                onChange={handleNewCommentChange} 
                placeholder="Add a comment"
                outlineColor={'#08C84F'} 
                mb="4"
                mt={8}
            />
            <Button colorScheme='teal' onClick={handleNewCommentSubmit} mb={4}>Submit Comment</Button>
            <VStack align="stretch" spacing="4">
            {comments.map(comment => (
                  <Box     
                  key={comment.id} 
                  bg="white" 
                  p="4" 
                  borderRadius="md"
                  border="1px solid #E2E8F0"
                  backgroundColor="#EDF2F7"
                  padding="10px" 
                  marginBottom="10px">
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

                      {user.uid === comment.userId && (
                          <IconButton 
                            icon={<DeleteIcon/>} 
                            colorScheme="red" 
                            onClick={() => handleDeleteComment(comment.id)}
                          />
                        )}
                        <DeleteAlertDialog 
                          isOpen={isOpen}
                          onClose={onClose}
                          leastDestructiveRef={cancelRef}
                          onConfirm={confirmDelete}
                            />
                      </HStack>
                  </Box>
              ))}
            </VStack>
        </Flex>
    </Box>
  );
}