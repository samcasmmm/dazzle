import { handleInviteCode } from '@/app/actions/invite-code-action';

type Props = {
  params: { inviteCode: string };
};

export default async function InviteCodePage({ params }: Props) {
  await handleInviteCode(params.inviteCode);
  return null;
}
