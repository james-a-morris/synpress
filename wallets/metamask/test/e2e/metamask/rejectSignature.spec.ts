import { testWithMetaMask } from '../testWithMetaMask'

const test = testWithMetaMask

const { expect } = test

test('should reject `personal_sign`', async ({ page, metamask }) => {
  await page.locator('#personalSign').click()

  await metamask.rejectSignature()

  await expect(page.locator('#personalSign')).toHaveText(
    'Error: MetaMask Message Signature: User denied message signature.'
  )
  await expect(page.locator('#personalSignResult')).toHaveText('')
})

test('should reject `eth_signTypedData`', async ({ page, metamask }) => {
  await page.locator('#signTypedData').click()

  await metamask.rejectSignature()

  await expect(page.locator('#signTypedDataResult')).toHaveText(
    'Error: MetaMask Message Signature: User denied message signature.'
  )
})

test('should reject `eth_signTypedData_v3`', async ({ page, metamask }) => {
  await page.locator('#signTypedDataV3').click()

  await metamask.rejectSignature()

  await expect(page.locator('#signTypedDataV3Result')).toHaveText(
    'Error: MetaMask Message Signature: User denied message signature.'
  )
})

test('should reject `eth_signTypedData_v4`', async ({ page, metamask }) => {
  await page.locator('#signTypedDataV4').click()

  await metamask.rejectSignature()

  await expect(page.locator('#signTypedDataV4Result')).toHaveText(
    'Error: MetaMask Message Signature: User denied message signature.'
  )
})