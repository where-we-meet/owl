import { type Dispatch, type SetStateAction, useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Divider, Link } from '@nextui-org/react';

import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';

import { FaMapLocationDot } from 'react-icons/fa6';
import styles from './CategoryMarker.module.css';

type InfoProps = {
  info: {
    [key: string]: string;
  };
  clickId: string;
  setClickId: Dispatch<SetStateAction<string>>;
};

const CategoryMarker = ({
  info: { id, x, y, category_group_name, place_name, place_url, road_address_name },
  clickId,
  setClickId
}: InfoProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickMarker = () => {
    setClickId(id);
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (id !== clickId) {
      setIsOpen(false);
    }
  }, [clickId]);

  return (
    <>
      <MapMarker
        position={{ lat: +y, lng: +x }}
        image={{
          src: '/images/category_marker.svg',
          size: {
            width: 50,
            height: 50
          }
        }}
        zIndex={6}
        onClick={handleClickMarker}
      />
      {isOpen && (
        <CustomOverlayMap position={{ lat: +y, lng: +x }} yAnchor={1.4} zIndex={7}>
          <Card className={styles.card}>
            <CardHeader className={styles.card_header}>
              <div className={styles.card_header_content}>
                <p>{place_name}</p>
                <p className={styles.small_text}>{category_group_name}</p>
              </div>
              <Divider orientation="vertical" />
              <Link isExternal showAnchorIcon href={place_url}>
                더 많은 정보
              </Link>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className={styles.card_body_content}>
                <FaMapLocationDot />
                <p>{road_address_name}</p>
              </div>
            </CardBody>
          </Card>
        </CustomOverlayMap>
      )}
    </>
  );
};

export default CategoryMarker;
