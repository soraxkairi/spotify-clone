"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUsers";
import Button from "@/components/Button";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { postData } from "@/libs/helper";

const AccountContent = () => {
    const router = useRouter();
    const subscribeModal = useSubscribeModal();
    const { isLoading, subscription, user } = useUser();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    const redirectToCustomerPortal = async () => {
        setLoading(true);
        try {
            const { url, error } = await postData({
                url: '/api/create-portal-link'
            });
            window.location.assign(url);
        } catch (error) {
            if (error) return alert((error as Error).message);
        }
        setLoading(false);
    };

    return (
        <div className="mb-7 px-6">
            {!subscription && (
                <div className="flex flex-col gap-y-4">
                    <p>No active plan.</p>
                    <Button
                        onClick={subscribeModal.onOpen}
                        className="w-[300px]"
                    >
                        Subscribe
                    </Button>
                    <a href="https://www.youtube.com/shorts/KUM2p2Weicg" className="block">
                        <button className="bg-green-500 text-black px-4 py-2 rounded-md hover:opacity-80">
                            Press this button for a free Spotify subscription
                        </button>
                    </a>
                </div>
            )}
            {subscription && (
                <div className="flex flex-col gap-y-4">
                    <p>You are currently on the
                        <b> {subscription?.prices?.products?.name} </b>
                        plan.
                    </p>
                    <Button
                        disabled={loading || isLoading}
                        onClick={redirectToCustomerPortal}
                        className="w-[300px]"
                    >
                        Open customer portal
                    </Button>
                </div>
            )}
        </div>
    );
}

export default AccountContent;