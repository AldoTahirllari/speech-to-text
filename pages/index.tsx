import Link from 'next/link';
import styled from 'styled-components';

export default function Home() {
  return (
    <OuterContainer>
      <Container>
        <Link href="/dashboard">Go to dashboard</Link>
      </Container>
    </OuterContainer>
  );
}
export const OuterContainer = styled.div`
  max-width: 32rem;
  max-height: fit-content;
`;
export const Container = styled.span`
  width: 100%;
  max-height: 100%;
  font-size: larger;
  font-weight: 500;
`;
