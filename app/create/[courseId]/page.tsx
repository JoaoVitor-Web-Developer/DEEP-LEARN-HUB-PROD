import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import React from "react";
import { Info } from "lucide-react";
import ConfirmChapters from "@/components/ConfirmChapters";

type Props = {
  params: {
    courseId: string;
  };
};

const CreateChapters = async ({ params: { courseId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/gallery");
  }
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });
  if (!course) {
    return redirect("/create");
  }
  return (
    <div className="flex flex-col items-start max-w-xl mx-auto my-16">
      <h5 className="text-sm uppercase text-secondary-foreground/60">
        Nome do Curso
      </h5>
      <h1 className="text-5xl font-bold">{course.name}</h1>
      <div className="flex p-4 mt-5 border-none bg-secondary">
        <Info className="w-12 h-12 mr-3 text-blue-400" />
        <div>
          Geramos capítulos para cada um dos seus subtópicos. Examine-os e
          clique no botão para confirmar e continuar
        </div>
      </div>
      <ConfirmChapters course={course}/>
    </div>
  );
};

export default CreateChapters;
