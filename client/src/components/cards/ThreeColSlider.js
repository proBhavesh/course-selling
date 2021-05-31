import React, { useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import StripeCheckout from "react-stripe-checkout";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import {parse, stringify} from 'flatted';
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track {
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`,
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;

const PrimaryButton = tw(
  PrimaryButtonBase
)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
export default () => {
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const [sliderRef, setSliderRef] = useState(null);
  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  /* Change this according to your needs */
  const cards = [
    {
      imageSrc:
        "https://media.gcflearnfree.org/global/topics/en/office-icon.svg",
      title: "Computer Basics",
      description:
        "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
      pricingText: "USD 59.99",
      rating: "4.8",
    },
    {
      imageSrc:
        "https://media.gcflearnfree.org/global/topics/en/email-icon.svg",
      title: "Basic Computer Skills",
      description:
        "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
      locationText: "Ibiza, Spain",
      pricingText: "USD 59.99",
      rating: 4.9,
    },
    {
      imageSrc:
        "https://media.gcflearnfree.org/global/topics/en/internet-icon.svg",
      title: "Internet Basics",
      description:
        "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
      locationText: "Palo Alto, CA",
      pricingText: "USD 59.99",
      rating: "5.0",
    },
    {
      imageSrc:
        "https://media.gcflearnfree.org/global/topics/en/online-safety-icon.svg",
      title: "Windows Basics",
      description:
        "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
      locationText: "Arizona, RAK",
      pricingText: "USD 99/Day",
      rating: 4.5,
    },
  ];

  //<<<<<<<<<<<<<<<<<#######################################______Stripe Payment Mathod 1________#########################>>>>>>>>>>>>>>>>>
  const [product, setProduct] = useState({
    name: "my course",
    price: 59,
    productBy: "Treact courses",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return fetch("http://localhost:5000/backend/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE", response);
        const { status } = response;
        console.log("Status", status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // // const stripe = Stripe('pk_test_51Is8NSSJt0CbONA4mhSeImnG5aPrRXkBSPimKu0HRiGnDRZmvMOQjfpVJNN3doWD1nOOUns6eQ41mzQsNTruIWoh00AM6RCrBZ');
  // const stripePromise = loadStripe(
  //   "pk_test_51Is8NSSJt0CbONA4mhSeImnG5aPrRXkBSPimKu0HRiGnDRZmvMOQjfpVJNN3doWD1nOOUns6eQ41mzQsNTruIWoh00AM6RCrBZ"
  // );

  // // stripe.redirectToCheckout({
  // //   lineItems: [{
  // //     // Define the product and price in the Dashboard first, and use the price
  // //     // ID in your client-side code.
  // //     price: '{PRICE_ID}',
  // //     quantity: 1
  // //   }],
  // //   successUrl: 'https://www.example.com/success',
  // //   cancelUrl: 'https://www.example.com/cancel'
  // // });

  // const handleClick = async (event) => {
  //   // Get Stripe.js instance
  //   const stripe = await stripePromise;

  //   // Call your backend to create the Checkout Session
  //   const response = await fetch("http://localhost:5000/backend/payment", {
  //     method: "POST",
  //   });

  //   const session = await response.json();

  //   // When the customer clicks on the button, redirect them to Checkout.
  //   const result = await stripe.redirectToCheckout({
  //     sessionId: session.id,
  //   });

  //   if (result.error) {
  //     // If `redirectToCheckout` fails due to a browser or network
  //     // error, display the localized error message to your customer
  //     // using `result.error.message`.
  //   }
  // };

  //<<<<<<<<<<<<<<<<<#######################################______Stripe Payment Mathod 3________#########################>>>>>>>>>>>>>>>>>

  // const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

  return (
    <Container>
      <Content>
        <HeadingWithControl>
          <Heading>Courses</Heading>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}>
              <ChevronLeftIcon />
            </PrevButton>
            <NextButton onClick={sliderRef?.slickNext}>
              <ChevronRightIcon />
            </NextButton>
          </Controls>
        </HeadingWithControl>
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {/*<CardSlider>*/}
          <Card>
            <CardImage imageSrc="https://media.gcflearnfree.org/global/topics/en/office-icon.svg" />
            <TextInfo>
              <TitleReviewContainer>
                <Title>Computer Basics</Title>
                {/* <RatingsInfo>
                    <StarIcon />
                    <Rating>5</Rating>
                  </RatingsInfo>*/}
              </TitleReviewContainer>
              <SecondaryInfoContainer>
                <IconWithText>
                  {/*<IconContainer>
                      <LocationIcon />
                    </IconContainer>
                    <Text>{card.locationText}</Text>*/}
                </IconWithText>
                <IconWithText>
                  <IconContainer>
                    <PriceIcon />
                  </IconContainer>
                  <Text>59.99</Text>
                </IconWithText>
              </SecondaryInfoContainer>
              <Description>
                Lorem ipsum dolor sit amet, consectur dolori adipiscing elit,
                sed do eiusmod tempor nova incididunt ut labore et dolore magna
                aliqua.
              </Description>
            </TextInfo>
            <StripeCheckout
              stripeKey="pk_test_51Is8NSSJt0CbONA4mhSeImnG5aPrRXkBSPimKu0HRiGnDRZmvMOQjfpVJNN3doWD1nOOUns6eQ41mzQsNTruIWoh00AM6RCrBZ"
              token={makePayment}
              name="buy computer Basics"
            >
              <PrimaryButton>Buy Now</PrimaryButton>
            </StripeCheckout>
          </Card>
          <Card>
            <CardImage imageSrc="https://media.gcflearnfree.org/global/topics/en/email-icon.svg" />
            <TextInfo>
              <TitleReviewContainer>
                <Title>Basic Computer Skills</Title>
                {/* <RatingsInfo>
                    <StarIcon />
                    <Rating>5</Rating>
                  </RatingsInfo>*/}
              </TitleReviewContainer>
              <SecondaryInfoContainer>
                <IconWithText>
                  {/*<IconContainer>
                      <LocationIcon />
                    </IconContainer>
                    <Text>{card.locationText}</Text>*/}
                </IconWithText>
                <IconWithText>
                  <IconContainer>
                    <PriceIcon />
                  </IconContainer>
                  <Text>59.99</Text>
                </IconWithText>
              </SecondaryInfoContainer>
              <Description>
                Lorem ipsum dolor sit amet, consectur dolori adipiscing elit,
                sed do eiusmod tempor nova incididunt ut labore et dolore magna
                aliqua.
              </Description>
            </TextInfo>
            <PrimaryButton>Buy Now</PrimaryButton>
          </Card>
          <Card>
            <CardImage imageSrc="https://media.gcflearnfree.org/global/topics/en/internet-icon.svg" />
            <TextInfo>
              <TitleReviewContainer>
                <Title>Internet Basics</Title>
                {/* <RatingsInfo>
                    <StarIcon />
                    <Rating>5</Rating>
                  </RatingsInfo>*/}
              </TitleReviewContainer>
              <SecondaryInfoContainer>
                <IconWithText>
                  {/*<IconContainer>
                      <LocationIcon />
                    </IconContainer>
                    <Text>{card.locationText}</Text>*/}
                </IconWithText>
                <IconWithText>
                  <IconContainer>
                    <PriceIcon />
                  </IconContainer>
                  <Text>59.99</Text>
                </IconWithText>
              </SecondaryInfoContainer>
              <Description>
                Lorem ipsum dolor sit amet, consectur dolori adipiscing elit,
                sed do eiusmod tempor nova incididunt ut labore et dolore magna
                aliqua.
              </Description>
            </TextInfo>
            <PrimaryButton>Buy Now</PrimaryButton>
          </Card>
          <Card>
            <CardImage imageSrc="https://media.gcflearnfree.org/global/topics/en/online-safety-icon.svg" />
            <TextInfo>
              <TitleReviewContainer>
                <Title>Windows Basics</Title>
                {/* <RatingsInfo>
                    <StarIcon />
                    <Rating>5</Rating>
                  </RatingsInfo>*/}
              </TitleReviewContainer>
              <SecondaryInfoContainer>
                <IconWithText>
                  {/*<IconContainer>
                      <LocationIcon />
                    </IconContainer>
                    <Text>{card.locationText}</Text>*/}
                </IconWithText>
                <IconWithText>
                  <IconContainer>
                    <PriceIcon />
                  </IconContainer>
                  <Text>59.99</Text>
                </IconWithText>
              </SecondaryInfoContainer>
              <Description>
                Lorem ipsum dolor sit amet, consectur dolori adipiscing elit,
                sed do eiusmod tempor nova incididunt ut labore et dolore magna
                aliqua.
              </Description>
            </TextInfo>
            <PrimaryButton>Buy Now</PrimaryButton>
          </Card>
        </CardSlider>
      </Content>
    </Container>
  );
};
