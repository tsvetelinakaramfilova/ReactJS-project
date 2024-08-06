import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import ErrorMessage from "../error-message/ErrorMessage";
import { apiKey, URL_CITY, URL_WEATHER, URL_ICON } from "./constWeather";

export default function Weather() {
  const { t } = useTranslation();
  const [cityData, setCityData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchCity = async (values) => {
    const { citySearch } = values;
    try {
      const cityResponse = await fetch(
        `${URL_CITY}?apikey=${apiKey}&q=${citySearch}`
      );
      const cityData = await cityResponse.json();
      setCityData(cityData[0]);

      const weatherResponse = await fetch(
        `${URL_WEATHER}${cityData[0].Key}?apikey=${apiKey}`
      );
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData[0]);
    } catch (err) {
      setError(err.message);
    }
  };

  const { values, changeHandler, submitHandler } = useForm(
    { citySearch: "" },
    fetchCity,
    true
  );

  const clearError = () => {
    setError("");
  };

  const getIconUrl = (iconNumber) => {
    const iconString = iconNumber.toString().padStart(2, "0");
    return `${URL_ICON}${iconString}-s.png`;
  };

  return (
    <div>
      <h1 className="text-center mb-4">{t("weather.weather")}</h1>
      <div className="mb-4">
        <Form onSubmit={submitHandler} className="w-50 mx-auto">
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              name="citySearch"
              id="citySearch"
              value={values.citySearch}
              onChange={changeHandler}
              placeholder={t("weather.enterCity")}
            />
            <Button
              type="submit"
              className="btn btn-dark px-4 p-2 bd-highlight"
            >
              <IoSearchSharp />
            </Button>
          </InputGroup>
        </Form>
      </div>
      {error && <ErrorMessage message={error} clearError={clearError} />}
      {cityData && (
        <div className="card w-50 shadow p-3 mb-5 bg-body rounded mx-auto">
          <h2 className="mt-1 mb-3 text-center">
            {cityData.LocalizedName}, {cityData.Country.LocalizedName}
          </h2>
          {weatherData && (
            <div className="d-flex justify-content-around">
              <div>
                <p>{weatherData.WeatherText}</p>
                <p>
                  {weatherData.Temperature.Metric.Value} °
                  {weatherData.Temperature.Metric.Unit}
                </p>
              </div>
              <img
                src={getIconUrl(weatherData.WeatherIcon)}
                alt="Weather Icon"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
