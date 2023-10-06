/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingPage from '../components/loading';
import { api } from '../api/axios';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { CalendarIcon, TimeIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { TransactionModal } from '../components/transactionModal';
import { useDispatch, useSelector } from 'react-redux';
import auth from '../redux/middleware/auth';

export const EventDetail = () => {
  const userDataFromLocalStorage = JSON.parse(localStorage.getItem('auth'));
  const desc2 = useSelector((state) => state.desc);
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [desc, setDesc] = useState({
    desc1: [
      '1.  Tiket yang sah adalah yang dibeli melalui loket.com',
      '2.  Satu tiket berlaku untuk satu orang, satu kali masuk area venue,   sudah termasuk tiket masuk Pameran PRJ Surabaya 2023.',
      '3.  Harap membawa tiket dari loket.com pada saat memasuki venue.',
      '4.  Penyelenggara memiliki hak untuk:',
      '    - Melarang masuk pengunjung jika tiket telah dipergunakan oleh orang lain.',
      '    - Melarang masuk pengunjung ke area venue jika tiket yang digunakan tidak valid.',
      '    - Memproses atau mengajukan hukum, baik perdata atau kriminal kepada pengunjung yang mendapatkan tiket dengan ilegal, termasuk memalsukan dan menggandakan tiket yang sah atau mendapatkan tiket dengan cara yang tidak sesuai prosedur.',
      '5.  Penyelenggara/Promotor tidak bertanggung jawab atas kelalaian pembeli tiket yang mengakibatkan E-voucher/tiket jatuh ke tangan orang lain (dalam penguasaan orang lain) untuk di gunakan sebagai tanda masuk ke tempat pertunjukan atau menukarkan tiket yang menghilangkan hak pembeli untuk masuk ke tempat pertunjukan/menukarkan E-voucher.',
      '6.  Ticket yang telah dibeli tidak dapat diuangkan kembali dengan alasan apapun.',
      '7.  Harap mematuhi protokol kesehatan yang diterapkan penyelenggara di area venue, mencuci tangan, menggunakan masker, dan menjaga jarak (3M).',
      '8.  Pihak penyelenggara akan menindak tegas, dan berhak mengeluarkan pengunjung apabila tidak mematuhi protokol kesehatan, berperilaku tidak tertib, menyinggung atau berprilaku yang tidak pantas, dan tamu yang menolak untuk mematuhi instruksi / peringatan dari staf festival / event. Tidak akan ada pengembalian uang.',
      '9.  Tamu bertanggung jawab sepenuhnya atas keamanan semua barang-barang pribadi. Kehilangan barang pribadi bukan tanggung jawab panitia.',
      '10. Dilarang membawa makanan dan minuman dari luar ke dalam venue.',
      '11. Dilarang membawa dan menggunakan segala obat-obatan terlarang, narkoba, psikotropika, atau barang-barang yang mengandung zat berbahaya lainnya.',
      '12. Dilarang membawa senjata tajam/api, bahan peledak, serta benda-benda yang dilarang berdasarkan ketentuan perundangan yang berlaku ke dalam venue.',
      '13. Jika terjadi pembatalan pertunjukkan di kemudian hari maka pembelian tiket akan dikembalikan sesuai dengan ketentuan promotor.',
      '14. Penyelenggara, promotor, dan artis tidak bertanggung jawab atas kompensasi dan/atau biaya pembatalan untuk biaya perjalanan yang Anda keluarkan apabila festival/acara yang dibatalkan atau ditunda.',
      '15. Harga tercantum belum termasuk biaya admin dan PPN.',
    ],
  });
  const dispacth = useDispatch();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await api.get(`/events/${eventId}`);
        setEventDetails(res.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching event details:', error.message);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('auth') !== null);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  if (!eventDetails) {
    return <div>Event not found</div>;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formatToRupiah = (price) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });

    return formatter.format(price);
  };
  const priceStyle = {
    fontWeight: 'bold',
  };

  return (
    <>
      <Container maxW="900px" p={[4, 6]} backgroundColor="#FBFBFB">
        <Flex
          flexDirection={['column', 'row']}
          align="center"
          mt={17}
          justify={['center', 'space-around']}
        >
          <Image
            width="100%"
            maxWidth={['100%', '542px']}
            height="auto"
            src={eventDetails.imageUrl}
            alt={eventDetails.eventName}
            borderRadius="md"
            mb={[4, 0]}
            mr={[0, 4]}
          />

          <Stack
            direction={['column', 'row']}
            spacing={4}
            border="none solid gray"
            borderRadius="20px"
            p={4}
            backgroundColor="white"
            boxShadow="md"
            flex="1"
            alignItems="center"
          >
            <Box flex="1">
              <Heading fontSize="16px" mb={2}>
                {eventDetails.eventName}
              </Heading>
              <Text fontSize="13px">
                <CalendarIcon marginRight={1} color={'#0049CC'} />
                {eventDetails.date}
              </Text>

              <Text fontSize="13px">
                <TimeIcon marginRight={1} color={'#0049CC'} />
                {eventDetails.time}
              </Text>

              <Text fontSize="13px">
                <TriangleDownIcon marginRight={1} color={'#0049CC'} />
                {eventDetails.location}
              </Text>
            </Box>
          </Stack>
        </Flex>

        <Tabs mt={10} isFitted>
          <TabList>
            <Tab fontSize={['sm', 'md']}>Description</Tab>
            <Tab fontSize={['sm', 'md']}>Tickets</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Heading p={2} fontSize={30}>
                Syarat & Ketentuan
              </Heading>
              {desc.desc1.map((description, index) => (
                <Text
                  key={index}
                  fontWeight="600"
                  color="gray.700"
                  fontSize={['sm', 'md']}
                  mb={2}
                >
                  {description}
                </Text>
              ))}
            </TabPanel>

            <TabPanel>
              <Stack
                direction="column"
                spacing={4}
                border="none solid gray"
                borderRadius="md"
                p={4}
                backgroundColor="#EBF5FF"
                boxShadow="md"
                width="100%"
                maxWidth="650px"
                margin="0 auto"
              >
                <Heading fontSize="18px">
                  {eventDetails.date} - <span>{eventDetails.eventName}</span>
                </Heading>
                <p>
                  Tiket Konser sudah termasuk Tiket Masuk Pameran. Harga belum
                  termasuk pajak
                </p>
                <Text fontSize="15px" color="#007AFF">
                  <TimeIcon marginRight={1} />
                  Berakhir {eventDetails.time}
                </Text>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontSize="md" style={priceStyle}>
                    {formatToRupiah(eventDetails.price)}
                  </Text>
                  <Button
                    fontSize="13px"
                    width={['100%', '110px']}
                    height="30px"
                    bg="#0049CC"
                    color="white"
                    _hover={{
                      bg: 'blue.900',
                    }}
                    _focus={{
                      bg: 'blue.600',
                    }}
                    onClick={handleOpenModal}
                  >
                    Beli Tiket
                  </Button>
                </Flex>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        eventDetails={eventDetails}
        userProfile={userDataFromLocalStorage}
        updateUserProfile={setUser}
        handleOpenModal={handleOpenModal}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
};
