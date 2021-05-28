import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import cb1 from "../../images/course/ComputerSkills/cb1.png";
import cb2 from "../../images/course/ComputerSkills/cb2.jpg";
import cb3 from "../../images/course/ComputerSkills/cb3.jpg";
import cb4 from "../../images/course/ComputerSkills/cb4.jpg";
import cb6 from "../../images/course/ComputerSkills/cb6.jpg";
import cb7 from "../../images/course/ComputerSkills/cb7.jpg";
import cb8 from "../../images/course/ComputerSkills/cb8.jpg";
import cb9 from "../../images/course/ComputerSkills/cb9.jpg";
import cb10 from "../../images/course/ComputerSkills/cb10.jpg";
import cb11 from "../../images/course/ComputerSkills/cb11.jpg";
import cb12 from "../../images/course/ComputerSkills/cb12.jpg";
import cb13 from "../../images/course/ComputerSkills/cb13.jpg";
// import cb14 from "../../images/course/ComputerSkills/cb14.jpg";
// import cb15 from "../../images/course/ComputerSkills/cb15.jpg";
//styles
const MainSec = tw.div`w-11/12 m-auto mt-4 lg:w-2/4 m-auto mt-4 mb-4`;
const Heading = tw.div`font-bold text-4xl text-gray-700 mb-5`;
const Heading2 = tw.div`font-bold text-2xl text-gray-700 mb-3`;
const Subheading = tw.div`text-xl text-gray-900 font-normal mb-5`;
const Subheading2 = tw.div`text-xl text-gray-900 font-normal mb-5 ml-10 mt-5`;
const ImageDiv = tw.div`relative text-center mb-1 h-2/4`;
const Lesson = tw.div`text-4xl text-gray-500 font-medium text-center my-16`;
const CardImage = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-64 bg-contain bg-no-repeat sm:h-64 bg-cover bg-center rounded bg-contain bg-no-repeat sm:rounded-none sm:rounded-tl-4xl bg-contain bg-no-repeat`,
]);

const ComputerBasics = () => {
  return (
    <>
      <MainSec>
        <Heading>About this tutorial</Heading>
        <Subheading>
          This tutorial will help you understand how computers work and how to
          use them. We'll talk about how to set up a computer, the difference
          between hardware and software, and the types of computers you can use.
          We'll also explore operating systems, applications, the cloud, and a
          whole lot more.
        </Subheading>
        <ImageDiv>
          <CardImage imageSrc={cb1}></CardImage>
        </ImageDiv>
        <Subheading>
          Whether you're getting started with your first computer or are just
          looking to learn more about how they work, you'll find all of the
          information you need in our written lessons, videos, and interactives.
          When you're done, you'll have a fundamental understanding of how to
          use a computer. You'll also be ready to learn even more about
          computers with some of our other tutorials.
        </Subheading>
        <Lesson>
          Lesson 2: What is a Computer?
          <hr />
        </Lesson>

        <Heading>What is a computer?</Heading>
        <Subheading>
          A computer is an electronic device that manipulates information, or
          data. It has the ability to store, retrieve, and process data. You may
          already know that you can use a computer to type documents, send
          email, play games, and browse the Web. You can also use it to edit or
          create spreadsheets, presentations, and even videos.
        </Subheading>
        <Heading>Hardware vs. software</Heading>
        <Subheading>
          Before we talk about different types of computers, let's talk about
          two things all computers have in common: hardware and software.
        </Subheading>
        <Subheading2>
          Hardware is any part of your computer that has a physical structure,
          such as the keyboard or mouse. It also includes all of the computer's
          internal parts, which you can see in the image below.
        </Subheading2>
        <ImageDiv>
          <CardImage imageSrc={cb2}></CardImage>
        </ImageDiv>
        <Subheading2>
          Software is any set of instructions that tells the hardware what to do
          and how to do it. Examples of software include web browsers, games,
          and word processors.
        </Subheading2>
        <ImageDiv>
          <CardImage imageSrc={cb3}></CardImage>
        </ImageDiv>
        <Heading>What are the different types of computers?</Heading>
        <Subheading>
          When most people hear the word computer, they think of a personal
          computer such as a desktop or laptop. However, computers come in many
          shapes and sizes, and they perform many different functions in our
          daily lives. When you withdraw cash from an ATM, scan groceries at the
          store, or use a calculator, you're using a type of computer.
        </Subheading>
        <ImageDiv>
          <CardImage imageSrc={cb4}></CardImage>
        </ImageDiv>
        <Heading2>Desktop computers</Heading2>
        <ImageDiv>
          <CardImage imageSrc={cb6}></CardImage>
        </ImageDiv>
        <Subheading>
          Many people use desktop computers at work, home, and school. Desktop
          computers are designed to be placed on a desk, and they're typically
          made up of a few different parts, including the computer case,
          monitor, keyboard, and mouse.
        </Subheading>
        <Heading2>Laptop computers</Heading2>
        <ImageDiv>
          <CardImage imageSrc={cb7}></CardImage>
        </ImageDiv>
        <Subheading>
          The second type of computer you may be familiar with is a laptop
          computer, commonly called a laptop. Laptops are battery-powered
          computers that are more portable than desktops, allowing you to use
          them almost anywhere.
        </Subheading>
        <Heading2>Tablet computers</Heading2>
        <ImageDiv>
          <CardImage imageSrc={cb8}></CardImage>
        </ImageDiv>
        <Subheading>
          Tablet computers—or tablets—are handheld computers that are even more
          portable than laptops. Instead of a keyboard and mouse, tablets use a
          touch-sensitive screen for typing and navigation. The iPad is an
          example of a tablet.
        </Subheading>
        <Heading2>Servers</Heading2>
        <ImageDiv>
          <CardImage imageSrc={cb9}></CardImage>
        </ImageDiv>
        <Subheading>
          A server is a computer that serves up information to other computers
          on a network. For example, whenever you use the Internet, you're
          looking at something that's stored on a server. Many businesses also
          use local file servers to store and share files internally.
        </Subheading>
        <Heading2>Other types of computers</Heading2>
        <Subheading>
          Many of today's electronics are basically specialized computers,
          though we don't always think of them that way. Here are a few common
          examples.
        </Subheading>
        <Subheading2>
          Smartphones: Many cell phones can do a lot of things computers can do,
          including browsing the Internet and playing games. They are often
          called smartphones.
        </Subheading2>
        <Subheading2>
          Wearables: Wearable technology is a general term for a group of
          devices—including fitness trackers and smartwatches—that are designed
          to be worn throughout the day. These devices are often called
          wearables for short.
        </Subheading2>
        <Subheading2>
          Game consoles: A game console is a specialized type of computer that
          is used for playing video games on your TV.
        </Subheading2>
        <Subheading2>
          TVs: Many TVs now include applications—or apps—that let you access
          various types of online content. For example, you can stream video
          from the Internet directly onto your TV.
        </Subheading2>
        <Heading>PCs and Macs</Heading>
        <Subheading>
          Personal computers come in two main styles: PC and Mac. Both are fully
          functional, but they have a different look and feel, and many people
          prefer one or the other.
        </Subheading>
        <Heading2>PCs</Heading2>
        <ImageDiv>
          <CardImage imageSrc={cb10}></CardImage>
        </ImageDiv>
        <Subheading>
          This type of computer began with the original IBM PC that was
          introduced in 1981. Other companies began creating similar computers,
          which were called IBM PC Compatible (often shortened to PC). Today,
          this is the most common type of personal computer, and it typically
          includes the Microsoft Windows operating system.
        </Subheading>
        <Heading2>Macs</Heading2>
        <ImageDiv>
          <CardImage imageSrc={cb11}></CardImage>
        </ImageDiv>
        <Subheading>
          The Macintosh computer was introduced in 1984, and it was the first
          widely sold personal computer with a graphical user interface, or GUI
          (pronounced gooey). All Macs are made by one company (Apple), and they
          almost always use the Mac OS X operating system.
        </Subheading>
        <Lesson>
          Lesson 3: Basic Parts of a Computer
          <hr />
        </Lesson>
        <Heading>Introduction</Heading>
        <Subheading2>
          The basic parts of a desktop computer are the computer case, monitor,
          keyboard, mouse, and power cord. Each part plays an important role
          whenever you use a computer.
        </Subheading2>
        <Heading2>Computer case</Heading2>
        <ImageDiv>
          <CardImage imageSrc={cb12}></CardImage>
        </ImageDiv>
        <Subheading>
          The computer case is the metal and plastic box that contains the main
          components of the computer, including the motherboard, central
          processing unit (CPU), and power supply. The front of the case usually
          has an On/Off button and one or more optical drives.
        </Subheading>
        <Subheading>
          Computer cases come in different shapes and sizes. A desktop case lies
          flat on a desk, and the monitor usually sits on top of it. A tower
          case is tall and sits next to the monitor or on the floor. All-in-one
          computers come with the internal components built into the monitor,
          which eliminates the need for a separate case.
        </Subheading>
        <Heading2>Monitor</Heading2>
        <ImageDiv>
          <CardImage imageSrc={cb13}></CardImage>
        </ImageDiv>
        <Subheading>
          The monitor works with a video card, located inside the computer case,
          to display images and text on the screen. Most monitors have control
          buttons that allow you to change your monitor's display settings, and
          some monitors also have built-in speakers.
        </Subheading>
        <Subheading>
          Newer monitors usually have LCD (liquid crystal display) or LED
          (light-emitting diode) displays. These can be made very thin, and they
          are often called flat-panel displays. Older monitors use CRT (cathode
          ray tube) displays. CRT monitors are much larger and heavier, and they
          take up more desk space.
        </Subheading>
        <Heading2>Keyboard</Heading2>
        <Subheading>
          The keyboard is one of the main ways to communicate with a computer.
          There are many different types of keyboards, but most are very similar
          and allow you to accomplish the same basic tasks.
        </Subheading>
        <Subheading2>
          <Heading2>Print Screen, Scroll Lock, Pause/Break</Heading2>
          <Subheading>
            The Print Screen, Scroll Lock, and Pause/Break keys are at the
            top-right corner of the keyboard. The Print Screen key takes a
            picture of your screen (called a screenshot) that you can edit or
            save using a graphics program. Scroll Lock and Pause/Break are
            rarely used today, so some keyboards don't have them.
          </Subheading>
          <Heading2>Escape Key</Heading2>
          <Subheading>
            The Escape (Esc) key allows you to stop a function or action. For
            example, if a webpage is taking a long time to load, you can press
            the Escape key to stop loading it.
          </Subheading>
          <Heading2>Function Keys</Heading2>
          <Subheading>
            The function keys are labeled F1 through F12. Some programs use
            these keys as shortcuts for common tasks. For example, in many
            programs, F1 opens the Help file.
          </Subheading>
        
        <Heading2>Tab Key</Heading2>
        <Subheading>
          The Tab key is used to create indents in word processing programs.
          Also, if you are filling out a form online, you can use the Tab key to
          switch to the next field.
        </Subheading>
        <Heading2>Alphanumeric Keys</Heading2>
        <Subheading>
          The main part of the keyboard includes the alphanumeric keys (letters
          and numbers) and the spacebar.
        </Subheading>
        <Heading2>Ctrl, Alt, and Shift</Heading2>
        <Subheading>
          The Control (Ctrl), Alternate (Alt), and Shift keys are designed to
          work in combination with other keys. Typically, you hold down Ctrl,
          Alt, or Shift and then type another key to perform a specific task.
          For example, in many programs, typing Ctrl+S will save a file.
        </Subheading>
        <Heading2>Arrow Keys</Heading2>
        <Subheading>
          The arrow keys are used for many different purposes, including moving
          the cursor, scrolling a document, and controlling a game.
        </Subheading>
        <Heading2>Numeric Keypad</Heading2>
        <Subheading>
          The numeric keypad resembles a calculator keypad. Many users find that
          it is easier to type numbers using this keypad. On some keyboards,
          these keys double as arrow keys.
        </Subheading>
        <Heading2>Enter</Heading2>
        <Subheading>
          The Enter key (also known as the return key) executes commands. For
          example, while on the Internet, you can type a website address and
          then press Enter to go to the site. It is also used to start a new
          line in word processing programs.
        </Subheading>
        <Heading2>Home and End</Heading2>
        <Subheading>
          These move the cursor to the beginning or end of the current line.
        </Subheading>
        <Heading2>Insert and Delete</Heading2>
        <Subheading>
          Insert: This switches between insert mode (which inserts new text
          without deleting anything) and overtype mode (which deletes text after
          the cursor as you type). Delete: This erases the character to the
          right of the cursor.
        </Subheading>
        <Heading2>Page Up and Page Down</Heading2>
        <Subheading>These scroll a document or webpage up or down.</Subheading>
        </Subheading2>
      </MainSec>
    </>
  );
};

export default ComputerBasics;
