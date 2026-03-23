'use server'

import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Resume from '@/lib/models/Resume'
import { ResumeData } from '@/lib/types'
import { revalidatePath } from 'next/cache'

export async function getResumes() {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new Error('Unauthorized')
    }

    await connectDB()
    const resumes = await Resume.find({ userId: session.user.id }).lean()
    return { success: true, resumes: JSON.parse(JSON.stringify(resumes)) }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function saveResume(resumeId: string, data: ResumeData, template: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new Error('Unauthorized')
    }

    await connectDB()
    
    if (resumeId === 'default') {
      // Create new resume
      const resume = await Resume.create({
        userId: session.user.id,
        title: 'My Resume',
        data,
        template,
      })
      revalidatePath('/builder')
      revalidatePath('/resume')
      return { success: true, resume: JSON.parse(JSON.stringify(resume)) }
    } else {
      // Update existing resume
      const resume = await Resume.findOneAndUpdate(
        { _id: resumeId, userId: session.user.id },
        { data, template, updatedAt: new Date() },
        { new: true }
      ).lean()
      
      revalidatePath('/builder')
      revalidatePath('/resume')
      return { success: true, resume: JSON.parse(JSON.stringify(resume)) }
    }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function createResume(title: string, data: ResumeData) {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new Error('Unauthorized')
    }

    await connectDB()
    const resume = await Resume.create({
      userId: session.user.id,
      title,
      data,
      template: 'classic',
    })

    revalidatePath('/builder')
    return { success: true, resume: JSON.parse(JSON.stringify(resume)) }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function deleteResume(resumeId: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new Error('Unauthorized')
    }

    await connectDB()
    await Resume.findOneAndDelete({ _id: resumeId, userId: session.user.id })
    
    revalidatePath('/builder')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function duplicateResume(resumeId: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new Error('Unauthorized')
    }

    await connectDB()
    const originalResume = await Resume.findOne({ _id: resumeId, userId: session.user.id }).lean()
    
    if (!originalResume) {
      throw new Error('Resume not found')
    }

    const newResume = await Resume.create({
      userId: session.user.id,
      title: `${originalResume.title} (Copy)`,
      data: originalResume.data,
      template: originalResume.template,
    })

    revalidatePath('/builder')
    return { success: true, resume: JSON.parse(JSON.stringify(newResume)) }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function renameResume(resumeId: string, title: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new Error('Unauthorized')
    }

    await connectDB()
    const resume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId: session.user.id },
      { title },
      { new: true }
    ).lean()

    revalidatePath('/builder')
    return { success: true, resume: JSON.parse(JSON.stringify(resume)) }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function shareResume(resumeId: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new Error('Unauthorized')
    }

    await connectDB()
    
    // Generate unique share ID
    const shareId = Math.random().toString(36).substring(2, 15)
    
    const resume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId: session.user.id },
      { isPublic: true, shareId },
      { new: true }
    ).lean()

    if (!resume) {
      throw new Error('Resume not found')
    }

    const shareUrl = `${process.env.NEXTAUTH_URL}/share/${shareId}`
    
    return { success: true, shareUrl }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getSharedResume(shareId: string) {
  try {
    await connectDB()
    const resume = await Resume.findOne({ shareId, isPublic: true }).lean()
    
    if (!resume) {
      return { success: false, error: 'Resume not found' }
    }

    return { success: true, resume: JSON.parse(JSON.stringify(resume)) }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}