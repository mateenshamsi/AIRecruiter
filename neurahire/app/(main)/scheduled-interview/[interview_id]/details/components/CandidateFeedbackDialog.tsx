import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function CandidateFeedbackDialog({ interviewFeedback }: { interviewFeedback: any[] }) {
   return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-purple-600 ml-8 shadow-md border"
        >
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Candidate Feedback</DialogTitle>
          <DialogDescription>
            {interviewFeedback.length > 0 ? (
            interviewFeedback.map((item, index) => {
  let parsed = {};
  if (item?.feedback?.content) {
    try {
      const cleanedString = item.feedback.content.replace(/```json\n?|```/g, '');
      parsed = JSON.parse(cleanedString);
    } catch (err) {
      console.error("JSON parsing failed:", err);
    }
  }

  return (
    <div>
                <div key={index} className="mt-4 flex items-center justify-between gap-4   rounded-lg shadow-sm">
                  <div className="flex items-center gap-2">
                    <p className="text-xs bg-purple-500 text-white rounded-full shadow-md w-fit p-4 border">
                      {item.userName[0]?.toUpperCase()}
                    </p>
                    <div className="ml-2">
                      <h2 className="text-lg font-bold">{item.userName}</h2>
                      <h2>{item.userEmail}</h2>
                    </div>
                </div>
                    <div className="flex gap-3 nl-2 items-center">
                        <h2 className="text-purple-400 text-2xl font-bold">  {
  ( (Number(parsed?.feedback?.rating?.techicalSkills) || 0) +
    (Number(parsed?.feedback?.rating?.communication) || 0) +
    (Number(parsed?.feedback?.problemSolving?.techicalSkills) || 0) +
    (Number(parsed?.feedback?.rating?.experince) || 0)
                     )/4         }/10</h2>

                    </div>
                  
                  </div>
                <div>
                    <h2 className="font-bold m-2">Skills Assesment</h2>
                    <div className="mt-3 grid grid-cols-2 gap-8 ">
                      <div>
                          <h2 className="flex justify-between font-bold text-black/80"> Technical Skills <span>{parsed?.feedback?.rating?.techicalSkills ?? 'N/A'}/10</span></h2>
                          <Progress value={90} className="h-2 bg-purple-400 rounded-full mt-1"/>
                            
                      </div>
                       <div>
                          <h2 className="flex justify-between font-bold text-black/80"> Communication <span>{parsed?.feedback?.rating?.communication ?? 'N/A'}/10</span></h2>
                          <Progress value={90} className="h-2 bg-purple-400 rounded-full mt-1"/>
                            
                      </div>
                       <div>
                          <h2 className="flex justify-between font-bold text-black/80"> Problem  Solving <span>{parsed?.feedback?.rating?.problemSolving ?? 'N/A'}/10</span></h2>
                          <Progress value={90} className="h-2 bg-purple-400 rounded-full mt-1"/>
                            
                      </div>
                       <div>
                          <h2 className="flex justify-between font-bold text-black/80"> Experience <span>{parsed?.feedback?.rating?.experince ?? 'N/A'}/10</span></h2>
                          <Progress value={90} className="h-2 bg-purple-400 rounded-full mt-1"/>
                            
                      </div>
                    </div>
                  </div>
                  </div>       
  );
})

) : (
              <p className="text-gray-500">No feedback available</p>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ); 
}

export default CandidateFeedbackDialog;
