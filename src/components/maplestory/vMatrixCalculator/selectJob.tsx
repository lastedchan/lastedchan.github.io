import { MenuItem, Select } from "@mui/material";
import styled from "@emotion/styled";
import { jobList } from "../../../../pages/v_matrix_calculator";
import { useRecoilState } from "recoil";
import { jobRecoil } from "../../../constants/recoil";

export default function SelectJob() {
  const [job, setJob] = useRecoilState(jobRecoil);
  return (
    <Container>
      <Select
        displayEmpty
        value={job}
        onChange={e => setJob(e.target.value.trim())}
        sx={{ height: "100%" }}
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
