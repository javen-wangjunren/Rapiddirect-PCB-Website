export type PcbProcessExpertAdvice = {
  title: string;
  desc: string;
};

export type PcbProcessStage = {
  stage_name: string;
  image_url?: string;
  process_name: string;
  process_desc: string[];
  expert_advice: PcbProcessExpertAdvice;
};

export type PcbProcessContent = {
  title: string;
  desc: string;
  stages: PcbProcessStage[];
};
