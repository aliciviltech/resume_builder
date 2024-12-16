import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { StaticImageData } from "next/image";

export interface educationType {
  degree: string,
  subject: string,
  startingYear: string,
  endingYear: string,
  institute: string,
  grade: string,
}
export interface experienceType {
  organization: string,
  jobDescription: string,
  startingYear: string,
  endingYear: string,
}
export interface Inputs {
  image?: FileList | File,
  name: string,
  profession: string,
  summary: string,
  dob: string,
  nationality: string,
  phone: string,
  email: string,
  linkedin: string,
  address: string,
  education: educationType[],
  skills: { name: string }[],
  languages?: { name: string }[],
  experience: experienceType[],
};
export interface formDataType { template: string, formData: Inputs, imageURL?: string | ArrayBuffer |null }

export const dummyUserData: Inputs = {
  name: 'John Daniel',
  profession: 'Python Developer',
  summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quia voluptate qui expedita assumenda? Perferendis quod, cupiditate, deleniti voluptatem necessitatibus velit odio sunt est commodi labore ea, nobis amet modi?',
  dob: '00-00-1900',
  nationality: 'Pakistani',
  phone: '021-00000000',
  email: 'xyz@gmail.com',
  linkedin: 'https://www.linkedin.com/in/john-daniel/',
  address: 'house-no:00, xyz-street, karachi pakistan',
  education: [
    {
      degree: 'Matric',
      subject: 'Science',
      startingYear: '2006',
      endingYear: '2008',
      institute: 'Govt School XYZ Karachi',
      grade: 'A-Grade',
    },
    {
      degree: 'Inter',
      subject: 'Pre-Engineering',
      startingYear: '2008',
      endingYear: '2010',
      institute: 'Govt College XYZ Karachi',
      grade: 'A1-Grade',
    },
    {
      degree: 'Bachelors ',
      subject: 'Computer Systems Engineering',
      startingYear: '2011',
      endingYear: '2015',
      institute: 'Govt University XYZ Karachi',
      grade: '1st-Division',
    }
  ],
  skills: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'Tailwind CSS' }, { name: 'JavaScript' }, { name: 'ReactJS' }, { name: 'Typescript' }, { name: 'Python' }],
  experience: [
    {
      organization: 'ZD-tech Engineers',
      jobDescription: 'Working on Backend applications',
      startingYear: '2016',
      endingYear: '2018'
    },
    {
      organization: 'XYZ-tech Solutions',
      jobDescription: 'Working on Web applications',
      startingYear: '2018',
      endingYear: '2022'
    }
  ]
}