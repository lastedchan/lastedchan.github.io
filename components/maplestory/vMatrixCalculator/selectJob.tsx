import { MenuItem, Select } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import styled from "@emotion/styled";
import { COOKIE_PREFIX_V_MATRIX_CALCULATOR } from "../../../constants/common";
import { jobList } from "../../../pages/v_matrix_calculator";

type Props = {
  job: string;
  setJob: Dispatch<SetStateAction<string>>;
};

export default function SelectJob({ job, setJob }: Props) {
  useEffect(
    () => localStorage.setItem(COOKIE_PREFIX_V_MATRIX_CALCULATOR + "job", job),
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
          <MenuItem key={i} value={job} disabled={!jobList[job].length}>
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
  flex: 1;
`;
