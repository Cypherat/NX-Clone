

import Head from 'next/head';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import { Movie } from '@/typings';
import requests from '@/utils/requests';
import Row from '@/components/Row';
import useAuth from '@/hooks/useAuth';
import { useRecoilValue } from 'recoil';
import { modalState } from '@/atoms/moduleAtom';
import Modal from '@/components/Modal';
import Plans from '@/components/Plans';
import fetchProducts from '@/lib/fetchProducts';
import { useEffect, useState } from 'react';
import { getSubscriptionStatus } from '@/lib/subscriptionStatus';
import app, { auth } from '@/firebase';

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  products: any[];
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
  products,
}: Props) => {
  console.log(products);
  const { logout, loading } = useAuth();
  const showModal = useRecoilValue(modalState);
  const [isSubscribed, setIsSubscribed] = useState(false);

useEffect(() => {
  const checkSubscription = async () => {
    const newSubscriptionStatus = auth.currentUser
      ? await getSubscriptionStatus(app)
      : false;
    setIsSubscribed(newSubscriptionStatus);
  };
  checkSubscription();
}, [app, auth.currentUser?.uid]);

  
if (loading || isSubscribed === null) return null;


if (!isSubscribed) return <Plans products={products} />;

  return (
    <div
      className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${
        showModal && '!h-screen overflow-hidden'
      }`}
    >
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href='/favicon.ico' />
      </Head>
      <Header />
      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
        <Banner netflixOriginals={netflixOriginals} />
        <section className='md:space-y-24'>
          <Row title='Trending Now' movies={trendingNow} />
          <Row title='Top Rated' movies={topRated} />
          <Row title='Action Thrillers' movies={actionMovies} />
          {/* My List Component */}
          <Row title='Comedies' movies={comedyMovies} />
          <Row title='Scary Movies' movies={horrorMovies} />
          <Row title='Romance Movies' movies={romanceMovies} />
          <Row title='Documentaries' movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    console.log('Fetching products...');

    const products = await fetchProducts(); // Use the fetchProducts function

    console.log('Fetched products:', products);

    const movieFetches = [
      requests.fetchNetflixOriginals,
      requests.fetchTrending,
      requests.fetchTopRated,
      requests.fetchActionMovies,
      requests.fetchComedyMovies,
      requests.fetchHorrorMovies,
      requests.fetchRomanceMovies,
      requests.fetchDocumentaries,
    ];

    const movieResponses = await Promise.all(
      movieFetches.map(async (url) => {
        console.log('Fetching:', url);
        const response = await fetch(url);
        const data = await response.json();
        console.log('Parsed Data:', data);
        return data;
      })
    );

    const [
      netflixOriginals,
      trendingNow,
      topRated,
      actionMovies,
      comedyMovies,
      horrorMovies,
      romanceMovies,
      documentaries,
    ] = movieResponses;

    return {
      props: {
        netflixOriginals: netflixOriginals?.results || [],
        trendingNow: trendingNow?.results || [],
        topRated: topRated?.results || [],
        actionMovies: actionMovies?.results || [],
        comedyMovies: comedyMovies?.results || [],
        horrorMovies: horrorMovies?.results || [],
        romanceMovies: romanceMovies?.results || [],
        documentaries: documentaries?.results || [],
        products,
      },
    };
  } catch (error) {
    console.log('Error fetching data:', error);

    return {
      props: {
        netflixOriginals: [],
        trendingNow: [],
        topRated: [],
        actionMovies: [],
        comedyMovies: [],
        horrorMovies: [],
        romanceMovies: [],
        documentaries: [],
        products: [],
      },
    };
  }
};

export default Home;

// with github test

