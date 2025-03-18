import { test } from '@playwright/test'
import { PostPage } from '../utils/pages/posts'

test.describe.configure({ mode: 'serial' })

test.describe('Posts Test Cases', () => {
  let post: PostPage

  test.beforeEach(async ({ page }) => {
    post = new PostPage(page)
    await page.goto('admin')
    await post.goToPosts()
  })

  test('Create a Post', async () => {
    await post.createPost()
  })

  test('Duplicate the Post', async () => {
    await post.duplicatePost()
  })

  test('Delete the Post', async () => {
    await post.deletePost()
  })
})
