import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useToast } from "@chakra-ui/react";

// TOASTS ----------------------------------------------------------------------

export function useToastError() {
  const toast = useToast();

  return (title: string, description: string) => {
    toast({
      title: title,
      description: description,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };
}

export function useToastSuccess() {
  const toast = useToast();

  return (title: string, description: string) => {
    toast({
      title: title,
      description: description,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
}

export function useToastCloseAll() {
  const toast = useToast();
  toast.closeAll();
}

// AUTH ------------------------------------------------------------------------

export function useMyId() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserId() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        useToastError()("Error", "not logged in");
        return;
      }
      setUserId(data?.user?.id ?? null);
    }

    fetchUserId();
  }, []);

  return userId;
}

// SUPABASE --------------------------------------------------------------------
// pass in uuid of any user and get their profile data
export function useUserProfile(uuid: string) {
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("userid", uuid)
        .single();
      if (error) {
        useToastError()("Error", "user not found");
        return;
      }
      setUserProfile(data);
    }

    fetchUserProfile();
  }, [uuid]);

  return userProfile;
}

interface Question {
  question_uuid: string;
  question_name: string;
  image: string;
  question_type_id: number;
  question_text: string;
  answer_options: string[];
  answer: number[];
  points: number;
}

export function useFetchClassQuestions(roomCode: string) {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("course_uuid", roomCode);

      if (error) {
        console.error(error);
      } else {
        setQuestions(data);
      }
    };

    fetchQuestions();
  }, [roomCode]);

  return questions;
}

export function useFetchQuestion(question_uuid: string) {
  const [question, setQuestion] = useState<Question>();

  useEffect(() => {
    const fetchQuestion = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select("question_name, question_text, answer_options, image")
        .eq("question_uuid", question_uuid)
        .single();

      if (error) {
        console.error(error);
      } else {
        const question = {
          question_uuid: question_uuid,
          question_type_id: 0, // replace with the correct value
          answer: [], // replace with the correct value
          points: 0, // replace with the correct value
          question_name: data.question_name,
          question_text: data.question_text,
          answer_options: data.answer_options,
          image: data.image,
        };
        setQuestion(question);
      }
    };

    fetchQuestion();
  }, [question_uuid]);

  return question;
}

// Fetch the courses that the student is enrolled in
export async function fetchStudentCourses(studentId: string) {
  const { data, error } = await supabase
    .from("course_students")
    .select("*, course:courses(*)")
    .eq("student_uuid", studentId);

  if (error) {
    console.error(error);
    return [];
  } else {
    return data;
  }
}

// Fetch the courses in which the student is an instructor
export async function fetchInstructorCourses(studentId: string) {
  const { data, error } = await supabase
    .from("course_instructors")
    .select("*, course:courses(*)")
    .eq("instructor_uuid", studentId);

  if (error) {
    console.error(error);
    return [];
  } else {
    return data;
  }
}

// OTHER -----------------------------------------------------------------------

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return isMobile;
}
