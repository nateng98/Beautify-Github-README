import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { config } from '../../config';
import { CategoryProps } from '../../type';
import { getData } from '../lib';

const CategoryFilters = ({id}:{id: string | undefined}) => {
	const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
	
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/categories`;
      try {
        setLoading(true);
        const data = await getData(endpoint);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

	return (
		<div className="hidden md:inline-flex flex-col gap-6">
      <p className="text-3xl font-bold">Filters</p>
      <div>
        <p className="text-sm uppercase font-semibold underline underline-offset-2 decoration-[1px] mb-2">
          Select Categories
        </p>
        <div className="flex flex-col gap-y-2 min-w-40">
          {loading ? (
            <div className="flex items-center justify-center my-5">
              <ColorRing
								visible={true}
								height="100"
								width="100"
								ariaLabel="color-ring-loading"
								wrapperStyle={{}}
								wrapperClass="color-ring-wrapper"
								colors={['#ece2029', '#d65e5e', '#e88b8b', '#8a8a8a', '#696969']}
							/>
            </div>
          ) : (
            categories?.map((item: CategoryProps) => (
              <Link
                to={`/category/${item?._base}`}
                key={item?._id}
                className={`text-base font-medium text-start underline underline-offset-2 decoration-[1px] decoration-transparent hover:decoration-gray-950 hover:text-black duration-200 ${
                  item?._base === id
                    ? "text-greenText decoration-greenText"
                    : "text-lightText"
                }`}
              >
                {item?.name}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
	)
}

export default CategoryFilters