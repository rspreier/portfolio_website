package com.rspreier.portfolioapi.ratelimit;

import org.springframework.stereotype.Component;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class InMemorySlidingWindowRateLimiter {
	private final Map<String, Deque<Long>> requestTimestamps = new ConcurrentHashMap<>();

	public boolean allow(String key, int maxRequests, long windowMillis) {
		Deque<Long> queue = requestTimestamps.computeIfAbsent(key, k -> new ArrayDeque<>());
		long now = System.currentTimeMillis();

		synchronized (queue) {
			while (!queue.isEmpty() && now - queue.peekFirst() > windowMillis) {
				queue.pollFirst();
			}

			if (queue.size() >= maxRequests) {
				return false;
			}

			queue.addLast(now);
			return true;
		}
	}
}
