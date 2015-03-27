package demo;

import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InstancesController {
	
	
	@RequestMapping("/admin/instances")	
	public List<Instance> list() {
		return Arrays.asList(
				new Instance("1", RandomStringUtils.randomAlphanumeric(10), "192.168.1.1:8080",  "UP"),
				new Instance("2", RandomStringUtils.randomAlphanumeric(10), "192.168.1.1:8081", "DOWN"));
	}
	
	public static class Instance {
		private final String id;
		private final String name;
		private final String endPoint;
		private final String status;
		
		public Instance(String id, String name, String endPoint, String status) {
			super();
			this.id = id;
			this.name = name;
			this.endPoint = endPoint;
			this.status = status;
		}

		public String getId() {
			return id;
		}

		public String getName() {
			return name;
		}

		public String getEndPoint() {
			return endPoint;
		}

		public String getStatus() {
			return status;
		}
		
		
	}
	
	
}
