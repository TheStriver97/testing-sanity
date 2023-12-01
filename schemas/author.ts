import {defineField, defineType} from 'sanity'
import {IconType} from 'react-icons'
import {FaTwitter,FaInstagram,FaLinkedin} from 'react-icons/fa'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'Meet_Your_Instructor',
      title: 'Instructor Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
    }),
    {
      type: 'object',
      name: 'twitterUrl',
      title: 'Twitter',
      fields: [
        {
          type: 'url',
          name: 'url',
          title: 'URL',
          validation: (Rule) =>
          Rule.regex(/^https:\/\/(www\.)?twitter\.com\/.+$/, 'i').error(
            'Invalid Twitter URL'
          ),
        },
      ],
    },
    {
      type: 'object',
      name: 'InstagramUrl',
      title: 'Instagram',
      fields: [
        {
          type: 'url',
          name: 'url',
          title: 'URL',
          validation: (Rule) =>
          Rule.regex(/^https:\/\/(www\.)?instagram\.com\/.+$/, 'i').error(
            'Invalid Instagram URL'
          ),
        },
      ],
    },
    {
      type: 'object',
      name: 'LinkedinUrl',
      title: 'Linkedin',
      fields: [
        {
          type: 'url',
          name: 'url',
          title: 'URL',
          validation: (Rule) =>
          Rule.regex(/^https:\/\/(www\.)?linkedin\.com\/.+$/, 'i').error(
            'Invalid Linkedin URL'
          ),
        },
      ],
    },
    
    
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      socials: 'socials[]',
    },
    prepare(selection) {
      const {title, media, socials} = selection
      // create a mapping of platform names to icons
      const icons:{[key:string]:IconType} = {
        Twitter: FaTwitter,
        Instagram: FaInstagram,
        Linkedin: FaLinkedin,
        // add more icons as needed
      }
      // create a subtitle that shows the icons and names of the platforms
      const subtitle = socials
        .map((social:{title:string}) => {
          // get the platform name from the title property of the social object
          const platform = social.title
          // get the icon component from the icons object
          const Icon = icons[platform]
          // return a string that contains the icon and the platform name
          return `<${Icon} /> ${platform}`
        })
        // join the strings with spaces
        .join(' ')
      // return the preview object with the title, media and subtitle
      return {
        title,
        media,
        subtitle,
      }
    },
  },
})