import { MenuItem, Select } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import { JobListType } from "../../../constants/types";
import styled from "@emotion/styled";
import { Cookies } from "react-cookie";
import { COOKIE_PREFIX_V_MATRIX_CALCULATOR } from "../../../constants/common";

type Props = {
  job: string;
  setJob: Dispatch<SetStateAction<string>>;
  jobList: JobListType;
};

export default function SelectJob({ job, setJob, jobList }: Props) {
  useEffect(
    () => new Cookies().set(COOKIE_PREFIX_V_MATRIX_CALCULATOR + "job", job),
    [job]
  );

  return (
    <Container>
      <Select
        displayEmpty
        value={job}
        onChange={e => setJob(e.target.value.trim())}
      >
        <MenuItem value={""}>직업 선택</MenuItem>
        {Object.keys(jobList).map((job, i) => (
          <MenuItem key={i} value={job}>
            {job}
          </MenuItem>
        ))}
      </Select>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0;
`;
