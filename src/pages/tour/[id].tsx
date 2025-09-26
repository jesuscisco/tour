import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ThreeFbsViewer from '../../components/threefbs/ThreeFbsViewer';
import SidebarMenu from '../../components/molecules/SidebarMenu';
import FooterNav from '../../components/molecules/FooterNav';
import { getHouseData } from '../../lib/seo'; // Assume this function fetches house data based on ID

const TourPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [houseData, setHouseData] = useState(null);

  useEffect(() => {
    if (id) {
      const data = getHouseData(id); // Fetch house data based on ID
      setHouseData(data);
    }
  }, [id]);

  if (!houseData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="flex flex-col h-screen">
      <SidebarMenu />
      <main className="flex-grow">
        <ThreeFbsViewer panoramaUrl={houseData.panoramaUrl} />
      </main>
      <FooterNav />
    </div>
  );
};

export default TourPage;